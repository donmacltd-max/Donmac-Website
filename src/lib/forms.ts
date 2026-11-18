export type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkboxes' | 'radio' | 'date' | 'file';
export type Field = { name: string; label: string; type: FieldType; required?: boolean; options?: string[]; placeholder?: string; full?: boolean; hint?: string; multiple?: boolean };

export const UNIT_OPTIONS = [
  { value: 'energy', label: 'Donmac Energy' },
  { value: 'ict', label: 'Donmac ICT' },
  { value: 'e-mobility', label: 'Donmac e-Mobility' },
  { value: 'sourcing', label: 'Donmac Specialized Sourcing' },
  { value: 'construction', label: 'General Construction' },
  { value: 'telecommunications', label: 'Telecommunications' },
  { value: 'general', label: 'General / not sure' },
];

const contact: Field[] = [
  { name: 'name', label: 'Full name', type: 'text', required: true },
  { name: 'organisation', label: 'Organisation', type: 'text' },
  { name: 'email', label: 'Email address', type: 'email', required: true },
  { name: 'phone', label: 'Phone or WhatsApp', type: 'tel', placeholder: '+260' },
];
const preferred: Field = { name: 'preferredContact', label: 'Preferred contact method', type: 'radio', options: ['Email', 'Phone call', 'WhatsApp'] };
const attachments = (hint = 'PDF, Word, Excel, CSV or images. Up to 5 files, 10 MB each.'): Field => ({ name: 'attachments', label: 'Supporting documents', type: 'file', multiple: true, full: true, hint });

export const FORMS: Record<string, { title: string; formType: string; unit?: string; fields: Field[] }> = {
  general: { title: 'General enquiry', formType: 'general', fields: [...contact, { name: 'unit', label: 'Area of interest', type: 'select', options: UNIT_OPTIONS.map((u) => u.label) }, { name: 'message', label: 'How can we help?', type: 'textarea', required: true, full: true }, preferred] },
  quotation: { title: 'Request for quotation', formType: 'quotation', fields: [...contact, { name: 'unit', label: 'Business division', type: 'select', required: true, options: UNIT_OPTIONS.map((u) => u.label) }, { name: 'location', label: 'Project or delivery location', type: 'text' }, { name: 'timeline', label: 'Required by', type: 'select', options: ['As soon as possible', 'Within 1 month', '1 to 3 months', '3 to 6 months', 'Planning stage'] }, { name: 'message', label: 'Describe your requirement (items, quantities, specifications)', type: 'textarea', required: true, full: true }, attachments('Specifications, BOQs, drawings or equipment lists. Up to 5 files, 10 MB each.'), preferred] },
  consultation: { title: 'Project consultation', formType: 'consultation', fields: [...contact, { name: 'unit', label: 'Discipline', type: 'select', options: UNIT_OPTIONS.map((u) => u.label) }, { name: 'stage', label: 'Project stage', type: 'select', options: ['Idea or concept', 'Feasibility', 'Design', 'Tender', 'Implementation', 'Existing system'] }, { name: 'location', label: 'Project location', type: 'text' }, { name: 'message', label: 'Project overview', type: 'textarea', required: true, full: true }, attachments(), preferred] },
  partnership: { title: 'Supplier and partnership enquiry', formType: 'partnership', fields: [...contact, { name: 'country', label: 'Country', type: 'text' }, { name: 'website', label: 'Company website', type: 'text' }, { name: 'partnerType', label: 'I am a', type: 'select', options: ['Manufacturer (OEM)', 'Distributor', 'Investor or financier', 'Development partner', 'Contractor or consultant', 'Other'] }, { name: 'message', label: 'Products, services or partnership proposal', type: 'textarea', required: true, full: true }, attachments('Company profile, product catalogue or certificates.')] },
  careers: { title: 'Careers enquiry', formType: 'careers', fields: [...contact, { name: 'area', label: 'Area of interest', type: 'select', options: ['Engineering (electrical / solar)', 'ICT', 'e-Mobility', 'Procurement and logistics', 'Construction', 'Finance and administration', 'Internship or attachment'] }, { name: 'message', label: 'Tell us about yourself', type: 'textarea', required: true, full: true }, attachments('Your CV (PDF or Word) and certificates.')] },
  energy: { title: 'Energy project assessment', formType: 'unit', unit: 'energy', fields: [...contact,
    { name: 'location', label: 'Project location (town / site)', type: 'text', required: true },
    { name: 'projectType', label: 'Project type', type: 'select', required: true, options: ['Solar EPC', 'Commercial and industrial solar PV', 'Utility-scale solar', 'Battery energy storage', 'Hybrid solar and backup power', 'Solar water pumping', 'Rural electrification / mini-grid', 'Power distribution', 'Operations and maintenance', 'Feasibility study / consulting'] },
    { name: 'load', label: 'Load requirements', type: 'textarea', full: true, placeholder: 'e.g. monthly kWh or bill amount, main equipment, peak demand, hours of back-up needed', required: true },
    { name: 'objectives', label: 'Energy objectives', type: 'checkboxes', full: true, options: ['Reduce electricity bills', 'Back-up during load-shedding', 'Reduce diesel use', 'Go off-grid', 'Sustainability targets', 'New site power'] },
    { name: 'message', label: 'Anything else we should know?', type: 'textarea', full: true }, attachments('Electricity bills, load lists, site photos or drawings.'), preferred] },
  ict: { title: 'ICT solution or quotation', formType: 'unit', unit: 'ict', fields: [...contact,
    { name: 'category', label: 'Category', type: 'select', required: true, options: ['Equipment procurement', 'Networking', 'Cybersecurity', 'Enterprise infrastructure', 'Surveillance and access control', 'Digital identity', 'Software and licensing', 'Technical support'] },
    { name: 'message', label: 'Requirement (models, quantities, specifications)', type: 'textarea', required: true, full: true }, { name: 'timeline', label: 'Required by', type: 'text' }, attachments('Specifications, tender documents or equipment lists.'), preferred] },
  'e-mobility': { title: 'EV, charging or fleet enquiry', formType: 'unit', unit: 'e-mobility', fields: [...contact,
    { name: 'interest', label: 'I am interested in', type: 'select', required: true, options: ['Electric vehicles', 'EV charging (AC / DC)', 'High-power DC charging', 'Fleet electrification', 'Electric buses', 'Electric motorcycles / battery swapping', 'Spare parts and after-sales'] },
    { name: 'vehicle', label: 'Vehicle or charger of interest', type: 'text' }, { name: 'quantity', label: 'Quantity / fleet size', type: 'text' }, { name: 'location', label: 'Location', type: 'text' },
    { name: 'message', label: 'Tell us about your requirement', type: 'textarea', required: true, full: true }, preferred] },
  sourcing: { title: 'Sourcing requirement', formType: 'unit', unit: 'sourcing', fields: [...contact,
    { name: 'category', label: 'Category', type: 'select', required: true, options: ['Industrial machinery', 'Mining equipment and consumables', 'Power and energy equipment', 'Construction machinery', 'Heavy commercial vehicles', 'ICT equipment', 'Government / institutional supply', 'Other specialised products'] },
    { name: 'deliveryLocation', label: 'Delivery location', type: 'text' }, { name: 'requiredBy', label: 'Required by', type: 'date' },
    { name: 'message', label: 'Item descriptions, quantities and specifications', type: 'textarea', required: true, full: true },
    attachments('Technical specifications, equipment schedules, bills of quantities and supporting documents. Up to 5 files, 10 MB each.'), preferred] },
  construction: { title: 'Construction enquiry', formType: 'unit', unit: 'construction', fields: [...contact, { name: 'location', label: 'Site location', type: 'text', required: true }, { name: 'projectType', label: 'Works type', type: 'select', options: ['Building', 'Civil works', 'Roads', 'Drainage', 'Maintenance'] }, { name: 'message', label: 'Scope of works', type: 'textarea', required: true, full: true }, attachments('Drawings, BOQs or scope documents.'), preferred] },
  telecommunications: { title: 'Telecom site enquiry', formType: 'unit', unit: 'telecommunications', fields: [...contact, { name: 'location', label: 'Site location(s)', type: 'text' }, { name: 'projectType', label: 'Service', type: 'select', options: ['New tower-site EPC', 'Power systems', 'Maintenance contract', 'Other'] }, { name: 'message', label: 'Requirement', type: 'textarea', required: true, full: true }, attachments(), preferred] },
};

export const ALLOWED_FIELDS = Array.from(new Set(Object.values(FORMS).flatMap((f) => f.fields.map((x) => x.name)).concat(['service', 'vehicle'])));
export const MAX_FILES = 5;
export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 25 * 1024 * 1024;
export const ALLOWED_EXT = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'jpg', 'jpeg', 'png', 'webp', 'txt'];
