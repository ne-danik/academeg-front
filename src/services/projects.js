import * as data from '../db/projects.json';

export const getAllProjects = () => {
  const projects = data?.data;
  
  const _transformData = (item) => {
    const attr = item?.attributes;
    return {
      id: item.id,
      name: attr.name,
      short_description: attr.short_description || '',
      webcast: attr.webcast || '',
      background: attr.bg_preview,
      slider: attr.slider.map(img => img)
    }
  }

  if (data) {
    return projects?.map(_transformData)
  };

  return {
    error: new Error(`Не могу загрузить данные}`)
  };
};

export const getOneProject = (id) => {
  const project = data?.data.filter(item => item.id == id);
  
  const _transformData = (item) => {
    const attr = item?.attributes;
    const spec = attr?.specification?.data?.attributes;
    const efficiency = spec?.Efficiency;
    const engine = spec?.Engine;
    const transmission = spec?.Transmission;
    const dimensions = spec?.Dimensions;
    const payload = spec?.Payload;

    return {
      id: item.id,
      name: attr.name || '',
      description: attr.description || '',
      quote: attr.quote,
      youtube_id: attr.youtube_id || '',
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
      background: {
        url: attr.bg_hero
      },
      bg_video: {
        mp4: attr.hero_video?.mp4,
        webm: attr.hero_video?.webm
      },
      background_spec: {
        url: attr.bg_spec
      },
      gallery: attr.gallery?.map(img => img.attributes?.url)
    }
  }

  if (project) {
    return _transformData(project[0])
  };

  return {
    error: new Error(`Не могу загрузить данные`)
  };
};