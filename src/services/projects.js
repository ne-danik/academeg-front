import {
  useRequest
} from '../hooks/request.hook';

export const getAllProjects = async (params, fetch) => {
  const query = `query Projects {
    projects(locale: "${params.locale}", sort: ["serial_num:asc"], pagination: { pageSize: 20 }) {
      data{
        id
        attributes{
          title
          short_description
          bg_preview
          slider
          webcast
          serial_num
        }
      }
    }
  }  
  `;

  const response = await useRequest(fetch, query);

  const _transformData = (data) => {
    const attr = data.attributes
    return {
      id: data.id,
      title: attr.title || '',
      short_description: attr.short_description || '',
      webcast: attr.webcast || '',
      bg_preview: attr.bg_preview || '',
      slider: attr.slider?.split(/\n/) || ''
    }
  }

  return response.data.projects.data.map(_transformData)
};

export const getOneProject = async (params, fetch, id) => {
  const query = `query Project {
    project(locale: "${params.locale}", id: ${id}) {
      data{
        id
        attributes{
          title
          description
          quote
          playlist_id
          hero_video
          bg_hero
          bg_spec
          gallery
          specification{
            data{
              attributes{
                Efficiency{
                  fuel_grade
                  max_speed
                  overclocking
                  fuel
                }
                Engine{
                  engine_type
                  max_power_rpm
                  max_power_hp
                  max_torque_nm
                  max_torque_rpm
                }
                Transmission{
                  transmission
                  drive
                  gears
                }
                Dimensions{
                  height
                  width
                  length
                  clearance
                }
                Payload{
                  curb_weight
                  full_mass
                  fuel_tank
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  const response = await useRequest(fetch, query);

  const _transformData = (data) => {
    const attr = data?.attributes;
    const spec = attr?.specification?.data?.attributes;
    const efficiency = spec?.Efficiency;
    const engine = spec?.Engine;
    const transmission = spec?.Transmission;
    const dimensions = spec?.Dimensions;
    const payload = spec?.Payload;

    return {
      id: data.id,
      title: attr.title,
      description: attr.description || '',
      quote: attr.quote,
      video_id: attr.video_id,
      specifications: {
        efficiency: {
          max_speed: efficiency?.max_speed || '-',
          overclocking: efficiency?.overclocking || '-',
          fuel: efficiency?.fuel || '-',
          fuel_grade: efficiency?.fuel_grade || '-'
        },
        engine: {
          engine_type: engine?.engine_type || '-',
          max_power_rpm: engine?.max_power_rpm || '-',
          max_power_hp: engine?.max_power_hp || '-',
          max_torque_nm: engine?.max_torque_nm || '-',
          max_torque_rpm: engine?.max_torque_rpm || '-'
        },
        transmission: {
          transmission: transmission?.transmission || '-',
          gears: transmission?.gears || '-',
          drive: transmission?.drive || '-'
        },
        dimensions: {
          height: dimensions?.height || '-',
          width: dimensions?.width || '-',
          length: dimensions?.length || '-',
          clearance: dimensions?.clearance || '-'
        },
        payload: {
          curb_weight: payload?.curb_weight || '-',
          fuel_tank: payload?.fuel_tank || '-',
          full_mass: payload?.full_mass || '-',
        }
      },
      bg_hero: attr.bg_hero,
      hero_video: attr.hero_video,
      bg_spec: attr.bg_spec,
      gallery: attr.gallery?.split(/\n/)
    }
  }

  return _transformData(response.data.project.data)
};