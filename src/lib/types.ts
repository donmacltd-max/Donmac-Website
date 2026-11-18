export type Img = { src: string; alt: string; caption?: string };
export type Service = { id: string; title: string; summary: string; capabilities: string[]; image?: string; imageFit?: 'cover' | 'contain'; imageBg?: string; alt?: string; icon?: string; link?: string };
export type Strength = { title: string; text: string };
export type Unit = {
  slug: string; order: number; capability?: boolean; name: string; number: string; tagline: string;
  heroTitle: string; heroText: string; heroImage: string; heroAlt: string; heroVideo?: string;
  cardImage: string; cardAlt: string; keyCapabilities: string[];
  introTitle: string; intro: string; introPoints: string[];
  showcaseVideo?: { src: string; poster: string; caption: string };
  services: Service[]; strengthsTitle: string; strengths: Strength[];
  references?: boolean; featuredProjects: string[]; partnerGroup?: string;
  charging?: { title: string; text: string; items: Strength[] };
  network?: { title: string; text: string; status: string };
  fleet?: { title: string; text: string; steps: string[] };
  catalogue?: { title: string; items: string[] }[];
  cta: { title: string; text: string }; formVariant: string; metaTitle: string; metaDescription: string;
};
export type Project = {
  slug: string; order: number; featured: boolean; title: string; client: string; unit: string; industry: string; type: string;
  location: string; year: string; status: string; summary: string; specs: { label: string; value: string }[];
  scope: string[]; challenge: string; solution: string; outcomes: string[]; images: Img[];
  relatedServices: { label: string; href: string }[];
};
export type Vehicle = {
  slug: string; order: number; make: string; model: string; group?: string; category: string; drivetrain: string;
  batteryKwh: number | null; rangeKm: number | null; testCycle?: string; motorPower?: string; torque?: string;
  charging?: string; payload?: string; towing?: string; summary: string; images: Img[]; imageBg?: string; brochure?: string; availability: string;
};
export type Leader = { slug: string; order: number; name: string; role: string; photo: string; bio: string; messageTitle?: string; message?: string[] };
export type Industry = { slug: string; name: string; short: string; icon: string; challenge: string; solutions: string[]; units: string[]; projects: string[] };
export type Article = { slug: string; title: string; date: string; category: string; author: string; image: string; imageAlt: string; excerpt: string; html: string; draft?: boolean };
