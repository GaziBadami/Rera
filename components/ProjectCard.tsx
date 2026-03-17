'use client'

import { Building2, MapPin, Calendar, Download, ExternalLink, CheckCircle, Clock, XCircle } from 'lucide-react'
import { makeAbsoluteUrl } from '@/lib/urlUtils'

interface ProjectCardProps {
  project: any
  state: string
  onClick?: () => void
}

export default function ProjectCard({ project, state, onClick }: ProjectCardProps) {
  const getStatusBadge = (status?: string) => {
    if (!status) return null
    
    const statusLower = status.toLowerCase()
    if (statusLower.includes('active') || statusLower.includes('approved')) {
      return (
        <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
          <CheckCircle className="w-3 h-3" />
          <span>Active</span>
        </div>
      )
    }
    if (statusLower.includes('pending') || statusLower.includes('under')) {
      return (
        <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-medium">
          <Clock className="w-3 h-3" />
          <span>Pending</span>
        </div>
      )
    }
    if (statusLower.includes('complete') || statusLower.includes('finish')) {
      return (
        <div className="flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
          <CheckCircle className="w-3 h-3" />
          <span>Completed</span>
        </div>
      )
    }
    return (
      <div className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-medium">
        {status}
      </div>
    )
  }

  // Auto-detect field names (different states have different column names)
  // Try multiple possible field names in order of preference
  const projectName = project.project_name || 
                      project.name || 
                      project.project || 
                      project.project_name_address ||
                      project.scheme_name ||
                      project.building_name ||
                      project.title ||
                      project.promoter_name_address ||
                      project.title_header ||
                      project.complainant_name ||
                      project.subject ||
                      project.project_registration_no || // Andaman uses this as identifier
                      'Unnamed Project'
                      
  const promoterName = project.promoter_name || 
                       project.promoter || 
                       project.promoter_name_address ||
                       project.authorised_name || 
                       project.developer_name ||
                       project.developer_name_address ||
                       project.developer ||
                       project.builder_name ||
                       project.builder ||
                       project.respondent_name || // For complaints
                       project.company_name ||
                       project.remarks ||
                       project.applicant_name_address || // Andaman
                       'Unknown Promoter'
                       
  const location = project.location || 
                   project.district || 
                   project.project_address || 
                   project.address ||
                   project.city ||
                   project.area ||
                   project.locality ||
                   project.village ||
                   project.project_details_address ||
                   project.district_plan_area ||
                   project.place ||
                   project.project_location ||
                   'Location not specified'
                   
  const regNo = project.registration_no || 
                project.rera_registration_no || 
                project.reg_no ||
                project.reg_number || 
                project.rera_no ||
                project.registration_number ||
                project.project_registration_no ||
                project.project_id ||
                project.reg_no_date ||
                project.rera_no || 
                project.survey_no ||
                project.aprera_registration_id ||
                project.registration_cert_number ||
                project.file_no ||
                project.application_no ||
                project.sr_no ||
                'N/A'
                
  const status = project.project_status || 
                 project.project_type ||
                 project.status || 
                 project.type || 
                 project.certificate_status ||
                 project.approval_status ||
                 project.current_status // Andaman
                 
  const completionDate = project.completion_date || 
                         project.proposed_end_date || 
                         project.extended_proposed_end_date ||
                         project.expected_completion_date ||
                         project.project_completion_date || // Andaman
                         project.end_date ||
                         project.date_of_order ||
                         project.property_typ
                         
  const regDate = project.registration_date || 
                  project.approved_date ||
                  project.approval_date ||
                  project.date ||
                  project.project_registration_no ||
                  project.registration_date_time ||
                  project.date_of_approval ||
                  project.valid_until ||
                  project.date_of_action ||
                  project.hearing_date ||
                  project.property_type ||
                  project.contact_details_of_promoter ||
                  project.scraped_at

  // Find PDF URL
  let pdfUrl = null
  const pdfKeys = Object.keys(project).filter(key => key.includes('pdf') && key.includes('url'))
  if (pdfKeys.length > 0) {
    pdfUrl = makeAbsoluteUrl(project[pdfKeys[0]], state)
  }

  // Find detail URL
  let detailUrl = null
  const urlKeys = Object.keys(project).filter(key => 
    (key.includes('url') || key.includes('link')) && 
    !key.includes('pdf') &&
    project[key] &&
    project[key] !== 'null'
  )
  if (urlKeys.length > 0) {
    detailUrl = makeAbsoluteUrl(project[urlKeys[0]], state)
  }

  return (
    <div 
      onClick={onClick}
      className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 overflow-hidden cursor-pointer"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start space-x-2 flex-1">
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                {projectName}
              </h3>
            </div>
          </div>
          {status && getStatusBadge(status)}
        </div>
        
        <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
          {promoterName}
        </p>
      </div>

      {/* Body */}
      <div className="p-4 space-y-2">
        <div className="flex items-start space-x-2 text-xs">
          <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
          <span className="text-slate-600 dark:text-slate-400 line-clamp-2">{location}</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="text-slate-500 dark:text-slate-500">
            <span className="font-medium text-slate-700 dark:text-slate-300">Reg:</span> {regNo}
          </div>
        </div>

        {completionDate && (
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>Completion: {completionDate}</span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition text-xs font-medium"
            >
              <Download className="w-3 h-3" />
              <span>PDF</span>
            </a>
          )}
          {detailUrl && (
            <a
              href={detailUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center space-x-1 px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition text-xs font-medium"
            >
              <ExternalLink className="w-3 h-3" />
              <span>View</span>
            </a>
          )}
        </div>
        
        {regDate && (
          <span className="text-xs text-slate-500 dark:text-slate-500">
            {regDate}
          </span>
        )}
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-blue-600/5 dark:bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  )
}