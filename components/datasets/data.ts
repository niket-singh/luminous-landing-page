/**
 * Robotics dataset catalogue. Presentation lives in components/datasets/.
 */

export type DatasetCategory = "Egocentric" | "Teleoperation" | "Glove & Tactile" | "Annotated";

export interface Dataset {
  code: string;
  title: string;
  category: DatasetCategory;
  setting: string;
  geography: string;
  workers: string;
  videos: string;
  otsHours: string;
  camera: string;
  resolution: string;
  imu: boolean;
  sampleUrl: string;
  customCollection?: boolean;
  note?: string;
}

export const DATASETS: Dataset[] = [
  {
    code: "AZL-EGO-01",
    title: "Mono Egocentric Data",
    category: "Egocentric",
    setting: "Residential",
    geography: "South Asia",
    workers: "800",
    videos: "20,000",
    otsHours: "10,000",
    camera: "iPhone 13 or newer",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/drive/folders/1Ec5f7yUlYdcbOOHZK04UTAWAL3CvYCjE?usp=drive_link",
  },
  {
    code: "AZL-EGO-02",
    title: "Mono Egocentric Data",
    category: "Egocentric",
    setting: "Commercial",
    geography: "South Asia",
    workers: "500",
    videos: "18,000",
    otsHours: "15,000",
    camera: "iPhone 13 or newer",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/drive/folders/1FD5Nh7BeS9Yod8GYOGBxzQSMq_CD8-9E?usp=drive_link",
  },
  {
    code: "AZL-EGO-03",
    title: "Mono Egocentric Data",
    category: "Egocentric",
    setting: "Residential",
    geography: "Latin America",
    workers: "100",
    videos: "15,000",
    otsHours: "8,000",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/file/d/1AK0CBaNGnzDmtehGRtDKvcRYTePsnzgY/view?usp=drive_link",
  },
  {
    code: "AZL-EGO-04",
    title: "Ego with IMU",
    category: "Egocentric",
    setting: "Residential",
    geography: "Asia",
    workers: "800",
    videos: "20,000",
    otsHours: "10,000",
    camera: "GoPro or any device",
    resolution: "720p",
    imu: true,
    sampleUrl: "https://drive.google.com/drive/folders/1WZdQWFRVAGoik_V-FpQsQw7i6AblWObg?usp=drive_link",
  },
  {
    code: "AZL-EGO-05",
    title: "Stereo Egocentric Data",
    category: "Egocentric",
    setting: "Residential",
    geography: "South Asia",
    workers: "10",
    videos: "12",
    otsHours: "100",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/file/d/1Y8Mc6LjRr9FY0Ewg3CksvQAG2W0KIgoD/view?usp=drive_link",
    note: "Full dataset captured with left and right wrist views.",
  },
  {
    code: "AZL-EGO-06",
    title: "Stereo Ego",
    category: "Egocentric",
    setting: "Industrial 60% / Residential 40%",
    geography: "Asia",
    workers: "50",
    videos: "500",
    otsHours: "5,000",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: true,
    sampleUrl: "https://drive.google.com/drive/folders/1L3eNdyRaVpiNQCUYrmG-FZIGdZSCJwCQ?usp=drive_link",
    note: "Full stereo calibration included — depth and disparity can be computed downstream via standard stereo matching.",
  },
  {
    code: "AZL-UMI-01",
    title: "UMI Gripper Data",
    category: "Egocentric",
    setting: "Residential / Commercial",
    geography: "Asia",
    workers: "800",
    videos: "20,000",
    otsHours: "10,000",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/file/d/1F8EtlRMGGY9KiHTsdkvAZLsRm8oCgzAg/view?usp=sharing",
  },
  {
    code: "AZL-TEL-01",
    title: "Teleoperation",
    category: "Teleoperation",
    setting: "Residential",
    geography: "Asia",
    workers: "20",
    videos: "100",
    otsHours: "600",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/file/d/1gwDVyiwqWXGzjvzs3l5soE_saa1PnHnl/view?usp=drive_link",
  },
  {
    code: "AZL-TEL-02",
    title: "Teleoperation — High Fidelity",
    category: "Teleoperation",
    setting: "Residential",
    geography: "Asia",
    workers: "20",
    videos: "8,000",
    otsHours: "5,000",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/file/d/1vcTQ7va_znrgjSGv0IaokBtBoNKJzpAe/view?usp=drive_link",
  },
  {
    code: "AZL-GLV-01",
    title: "Optical Glove Data",
    category: "Glove & Tactile",
    setting: "Residential / Commercial",
    geography: "Asia",
    workers: "Custom",
    videos: "Custom",
    otsHours: "Custom",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: true,
    sampleUrl: "https://drive.google.com/file/d/1yLbrBjzl1EFi_fauGH5HY1Ij9PT5sPYx/view?usp=drive_link",
    customCollection: true,
  },
  {
    code: "AZL-GLV-02",
    title: "Tactile Glove Data",
    category: "Glove & Tactile",
    setting: "Industrial 60% / Household 40%",
    geography: "Asia",
    workers: "50",
    videos: "500",
    otsHours: "5,000",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: true,
    sampleUrl: "https://drive.google.com/drive/folders/1zVjtYr27iy8GxP1H2BOUe1uBguJqvfii?usp=sharing",
    note: "Hand pose plus contact data for dexterous manipulation.",
  },
  {
    code: "AZL-ANN-01",
    title: "Annotated Data",
    category: "Annotated",
    setting: "Commercial",
    geography: "South Asia",
    workers: "500",
    videos: "18,000",
    otsHours: "15,000",
    camera: "iPhone 13 or newer",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/drive/folders/1GlCVd4Yg31b-ndurhYmNmq9q92Vj15uZ?usp=drive_link",
  },
  {
    code: "AZL-ANN-02",
    title: "Annotated Data",
    category: "Annotated",
    setting: "Residential / Commercial",
    geography: "Asia",
    workers: "800",
    videos: "20,000",
    otsHours: "10,000",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/file/d/1hwL29bQ1zqSsbMWcrihXyuUt_1xU2aXX/view?usp=drive_link",
  },
];

export const FILTERS = ["All", "Egocentric", "Teleoperation", "Glove & Tactile", "Annotated"] as const;

export type Filter = (typeof FILTERS)[number];

export const CATEGORY_GLYPHS: Record<DatasetCategory, string> = {
  Egocentric: "EGO",
  Teleoperation: "TEL",
  "Glove & Tactile": "GLV",
  Annotated: "ANN",
};
