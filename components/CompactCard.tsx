'use client'

import { User, MapPin, Phone, Calendar, FileText, ExternalLink, Download } from 'lucide-react'
import { makeAbsoluteUrl } from '@/lib/urlUtils'

interface CompactCardProps {
  data: any
  state: string
  type?: 'agent' | 'complaint' | 'order' | 'general' | 'cause List'
  onClick?: () => void
}

export default function CompactCard({ data, state, type = 'general', onClick }: CompactCardProps) {
  const getName = () => {
    if (type === 'agent') {
      return data.agent_name || 
             data.name || 
             data.agent_name_address ||
             data.complaintants ||
             data.complaint_type ||
             data.registered_name || 
             data.authorised_name ||
             data.promoter_name ||
             data.title_header ||
             data.complaint_type ||
             'Unnamed Agent'
    }
    return data.name || 
           data.title || 
           data.complainant ||
           data.complainants ||
           data.complainant_name || 
           data.project_name || 
           data.subject ||
           data.party_name ||
           data.complaint_title ||
           data.complaint_no ||
           data.complaint_name ||
           data.complaint_type ||
           'Untitled'
  }

  const getSecondaryInfo = () => {
    if (type === 'agent') {
      return data.company_name || 
             data.firm_name || 
             data.organization ||
             data.address ||
             data.remarks ||
             data.category || 
             data.agent_type 
    }
    return data.promoter_name || 
           data.promoter || 
           data.description ||
           data.details ||
           data.form_type ||
           data.court_name ||
           data.category ||
           data.respondent ||
           data.respondents ||
           data.respondent_name 
  }

  const getLocation = () => {
    return data.district || 
           data.location || 
           data.city || 
           data.address ||
           data.area ||
           data.region ||
           data.place ||
           data.district_name ||
           data.agent_address
  }

  const getRegNo = () => {
    return data.registration_no || 
           data.rera_registration_no || 
           data.reg_no || 
           data.reg_number ||
           data.case_no || 
           data.case_number ||
           data.order_no ||
           data.certi_no ||
           data.certificate_no ||
           data.complaint_no ||
           data.application_no ||
           data.registration_id ||
           data.complaint_number ||
           data.agent_reg_no ||
           data.agent_type ||
           data.final_order_document_name
  }

  const getDate = () => {
    return data.registration_date || 
           data.date || 
           data.filed_date || 
           data.complaint_filed_date ||
           data.order_date ||
           data.approval_date ||
           data.created_date ||
           data.date_of_submission ||
           data.complaint_date ||
           data.scraped_at ||
           data.registration_validity ||
           data.cert_issuing_date ||
           data.validity_period ||
           data.issue_date
  }

  const getContact = () => {
    return data.mobile_no || 
           data.phone || 
           data.contact || 
           data.contact_number ||
           data.mobile ||
           data.telephone ||
           data.agent_phone ||
           data.agent_contact ||
           data.individual_mobile 
  }

  // Find PDF URL
  let pdfUrl = null
  const pdfKeys = Object.keys(data).filter(key => key.includes('pdf') && key.includes('url'))
  if (pdfKeys.length > 0) {
    pdfUrl = makeAbsoluteUrl(data[pdfKeys[0]], state)
  }

  // Find detail URL
  let detailUrl = null
  const urlKeys = Object.keys(data).filter(key =>
    (key.includes('url') || key.includes('link')) &&
    !key.includes('pdf') &&
    data[key] &&
    data[key] !== 'null'
  )
  if (urlKeys.length > 0) {
    detailUrl = makeAbsoluteUrl(data[urlKeys[0]], state)
  }

  const name = getName()
  const secondaryInfo = getSecondaryInfo()
  const location = getLocation()
  const regNo = getRegNo()
  const date = getDate()
  const contact = getContact()

  const handleCardClick = () => {
    if (detailUrl) {
      window.open(detailUrl, '_blank', 'noopener,noreferrer')
    } else {
      onClick?.()
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 overflow-hidden cursor-pointer"
    >
      <div className="flex items-center p-3 gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
          {type === 'agent' ? (
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          ) : type === 'order' ? (
            <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          ) : (
            <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              {/* Name with tooltip */}
              <div className="relative group/tooltip">
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition cursor-pointer">
                  {name}
                </h4>
                {/* Tooltip */}
                {name && name.length > 40 && (
                  <div className="absolute left-0 top-full mt-1 z-50 hidden group-hover/tooltip:block w-max max-w-xs bg-slate-900 dark:bg-slate-700 text-white text-xs rounded-lg px-3 py-2 shadow-xl pointer-events-none">
                    {name}
                    {/* Arrow */}
                    <div className="absolute -top-1 left-4 w-2 h-2 bg-slate-900 dark:bg-slate-700 rotate-45" />
                  </div>
                )}
              </div>

              {/* Secondary info with tooltip */}
              {secondaryInfo && (
                <div className="relative group/tooltip2 mt-0.5">
                  <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                    {secondaryInfo}
                  </p>
                  {secondaryInfo && secondaryInfo.length > 40 && (
                    <div className="absolute left-0 top-full mt-1 z-50 hidden group-hover/tooltip2:block w-max max-w-xs bg-slate-900 dark:bg-slate-700 text-white text-xs rounded-lg px-3 py-2 shadow-xl pointer-events-none">
                      {secondaryInfo}
                      <div className="absolute -top-1 left-4 w-2 h-2 bg-slate-900 dark:bg-slate-700 rotate-45" />
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Right side info */}
            <div className="flex-shrink-0 text-right">
              {date && (
                <div className="flex items-center justify-end space-x-1 text-xs text-slate-500 dark:text-slate-500">
                  <Calendar className="w-3 h-3" />
                  <span>{date}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Info Row */}
          <div className="flex items-center justify-between mt-2 gap-2">
            <div className="flex items-center space-x-3 text-xs text-slate-600 dark:text-slate-400">
              {/* Location with tooltip */}
              {location && (
                <div className="relative group/tooltip3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate max-w-[150px]">{location}</span>
                  </div>
                  {location && location.length > 20 && (
                    <div className="absolute left-0 top-full mt-1 z-50 hidden group-hover/tooltip3:block w-max max-w-xs bg-slate-900 dark:bg-slate-700 text-white text-xs rounded-lg px-3 py-2 shadow-xl pointer-events-none">
                      {location}
                      <div className="absolute -top-1 left-4 w-2 h-2 bg-slate-900 dark:bg-slate-700 rotate-45" />
                    </div>
                  )}
                </div>
              )}
              
              {contact && (
                <div className="flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>{contact}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1.5">
              {regNo && (
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-mono">
                  {regNo.length > 15 ? `${regNo.substring(0, 15)}...` : regNo}
                </span>
              )}
              
              {pdfUrl && (
                <button
                  onClick={(e) => { e.stopPropagation(); window.open(pdfUrl!, '_blank', 'noopener,noreferrer') }}
                  className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                  title="View PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              )}

              {detailUrl && (
                <button
                  onClick={(e) => { e.stopPropagation(); window.open(detailUrl!, '_blank', 'noopener,noreferrer') }}
                  className="p-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition"
                  title="View Details"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-blue-600/5 dark:bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  )
}