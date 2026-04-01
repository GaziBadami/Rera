// State to table mapping configuration
export const stateConfig = {
  'andaman-nicobar': {
    name: 'Andaman & Nicobar',
    categories: {
      projects: { table: 'andaman_projects', label: 'Projects' },
      agents: { table: 'andaman_agents', label: 'Agents' }
    }
  },
  'andhra-pradesh': {
    name: 'Andhra Pradesh',
    categories: {
      projects: { table: 'ap_project', label: 'Projects' },
      agents: { table: 'ap_agents', label: 'Agents' },
      complaints: { table: 'ap_complaint_orders', label: 'Complaint Orders' }
    }
  },
  'assam': {
    name: 'Assam',
    categories: {
      projects: { table: 'assam_registered_projects', label: 'Projects' },
      agents: { table: 'assam_agents', label: 'Agents' },
      updates: { table: 'assam_orders', label: 'Orders' }
    }
  },
  'chhattisgarh': {
    name: 'Chhattisgarh',
    categories: {
      projects: { table: 'chhattisgarh_projects_complete', label: 'Projects' },
      agents: { table: 'chhattisgarh_agents', label: 'Agents' },
      defaulters: { table: 'chhattisgarh_defaulters', label: 'Defaulters' },
      orders: { table: 'chhattisgarh_final_orders', label: 'Final Orders' }
    }
  },
  'delhi': {
    name: 'Delhi',
    categories: {
      promoters: { table: 'delhi_promoters', label: 'Promoters' },
      agents: { table: 'delhi_agents', label: 'Agents' },
      complaints: { table: 'delhi_complaints', label: 'Complaints' }
    }
  },
  'goa': {
    name: 'Goa',
    categories: {
      projects: { table: 'goa_projects', label: 'Projects' },
      agents: { table: 'goa_agents', label: 'Agents' },
      complaints: { table: 'goa_complaints', label: 'Complaints' }
    }
  },
  'gujarat': {
    name: 'Gujarat',
    categories: {
      projects: { table: 'approved_projects', label: 'Projects' },
      agents: { table: 'approved_agents', label: 'Agents' },
      complaints: { table: 'complaints_summary', label: 'Complaints' }
    }
  },
  'haryana': {
    name: 'Haryana',
    hasSubRegions: true,
    regions: {
      gurugram: {
        name: 'Gurugram',
        categories: {
          projects: { table: 'haryana_gurugram_projects', label: 'Projects' },
          agents: { table: 'haryana_gurugram_agents', label: 'Agents' }
        }
      },
      panchkula: {
        name: 'Panchkula',
        categories: {
          projects: { table: 'haryana_projects', label: 'Projects' },
          agents: { table: 'haryana_agents', label: 'Agents' }
        }
      }
    }
  },
  'jammu-kashmir': {
    name: 'Jammu & Kashmir',
    categories: {
      projects: { table: 'jk_projects', label: 'Projects' },
      agents: { table: 'jk_agents', label: 'Agents' }
    }
  },
  'jharkhand': {
    name: 'Jharkhand',
    hasSubCategories: true,
    categories: {
      'projects-online': { table: 'jharkhand_projects', label: 'Projects (Online)' },
      'projects-offline': { table: 'jharkhand_offline_projects', label: 'Projects (Offline)' },
      judgements: { table: 'jharkhand_judgements', label: 'Judgements' }
    }
  },
  'kerala': {
    name: 'Kerala',
    categories: {
      projects: { table: 'kerala_projects', label: 'Projects' },
      agents: { table: 'kerala_agents', label: 'Agents' },
      complaints: { table: 'kerala_complaints', label: 'Complaints' },
      causelist: { table: 'kerala_causelist', label: 'Cause List' }
    }
  },
  'madhya-pradesh': {
    name: 'Madhya Pradesh',
    categories: {
      projects: { table: 'mp_projects', label: 'Projects' }
    }
  },
  'maharashtra': {
    name: 'Maharashtra',
    categories: {
      projects: { table: 'registered_projects', label: 'Projects' },
      agents: { table: 'registered_agents', label: 'Agents' },
      complaints: { table: 'registered_complaints', label: 'Complaints' }
    }
  },
  'puducherry': {
    name: 'Puducherry',
    categories: {
      defaulters: { table: 'puducherry_defaulter_projects', label: 'Defaulter Projects' },
      agents: { table: 'puducherry_rera_agents', label: 'Agents' }
    }
  },
  'punjab': {
    name: 'Punjab',
    categories: {
      projects: { table: 'punjab_rera_projects', label: 'Projects' },
      agents: { table: 'rera_agents', label: 'Agents' },
      orders: { table: 'punjab_orders_judgements', label: 'Orders & Judgements' },
      penalty: { table: 'rera_penalty_projects', label: 'Penalty Projects' }
    }
  },

  'tamil-nadu': {
    name: 'Tamil Nadu',
    categories: {
      projects: { table: 'tamilnadu_projects', label: 'Projects' },
      agents: { table: 'tamilnadu_agents', label: 'Agents' },
      complaints: { table: 'tamilnadu_complaints', label: 'Complaints' }
    }
  },
  'telangana': {
    name: 'Telangana',
    categories: {
      projects: { table: 'telangana_projects', label: 'Projects' },
      agents: { table: 'telangana_agents', label: 'Agents' },
      orders: { table: 'telangana_orders', label: 'Orders' },
      causelist: { table: 'telangana_cause_list', label: 'Cause List' }
    }
  },
  'uttarakhand': {
    name: 'Uttarakhand',
    categories: {
      projects: { table: 'uttarakhand_projects', label: 'Projects' },
      agents: { table: 'uttarakhand_agents', label: 'Agents' }
    }
  },
  'west-bengal': {
    name: 'West Bengal',
    categories: {
      projects: { table: 'westbengal_projects', label: 'Projects' },
      agents: { table: 'west_bengal_agents', label: 'Agents' },
      defaulters: { table: 'westbengal_defaulters', label: 'Defaulters' }
    }
  },
  'bihar': {
    name: 'Bihar',
    categories: {
      projects: { table: 'bihar_projects', label: 'Projects' },
      agents: { table: 'bihar_registered_agents', label: 'Agents' },
      defaulters: { table: 'bihar_defaulters', label: 'Defaulters' },
      orders: { table: 'bihar_interim_orders', label: 'Orders' }
    }
  },

}

export type StateKey = keyof typeof stateConfig