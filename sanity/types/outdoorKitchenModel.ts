export interface SanityImageAsset {
  _ref: string;
  _type: "reference";
}

export interface SanityImageCrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SanityImageHotspot {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface OutdoorKitchenModel {
  _id: string;
  _type: "outdoorKitchenModel";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  description: string;
  heroImage: {
    _type: "image";
    asset: SanityImageAsset;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
    alt?: string;
  };
  moduleTypes: ModuleType[];
  materialFinishes: MaterialFinish[];
  price?: number;
  featured?: boolean;
  publishedAt?: string;
}

export interface ModuleType {
  _key: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface MaterialFinish {
  _key: string;
  name: string;
  description?: string;
  color?: string;
  image?: {
    _type: "image";
    asset: SanityImageAsset;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
    alt?: string;
  };
}

