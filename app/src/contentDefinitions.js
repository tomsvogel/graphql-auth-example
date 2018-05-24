import {
  CONTENT_CHILDS,
  CONTENT_IMAGE,
  CONTENT_MULTIPLE_IMAGE,
  CONTENT_SINGLE_TEXT,
  CONTENT_TARGET,
  CONTENT_TEXT,
} from './arkulpa-fec/components/Content/contentConstants';
import config from './config';

const defaultType = [{title: 'Artikel', key: 'article', type: CONTENT_TEXT}];

const ImageLink = [
  {title: 'Url', key: 'url', type: CONTENT_SINGLE_TEXT},
  {title: 'Target', key: 'target', type: CONTENT_TARGET},
  {title: 'Titel', key: 'title', type: CONTENT_SINGLE_TEXT},
  {title: 'Image', key: 'image', type: CONTENT_IMAGE},
];

const TextSlider = [
  {title: 'Text', key: 'text', type: CONTENT_TEXT},
  {title: 'Image', key: 'media', type: CONTENT_IMAGE},
];

const contentDefinitions = {
  'arkulpa-next-js': {
    default: defaultType,
  },
  'stanztech-next-js': {
    default: defaultType,
    index: [
      {title: 'Logo', key: 'logo', type: CONTENT_IMAGE},
      {title: 'Artikel', key: 'article', type: CONTENT_TEXT},
      {title: 'Slider', key: 'slider', type: CONTENT_MULTIPLE_IMAGE},
      {title: 'Contact 1', key: 'contact1', type: CONTENT_TEXT},
      {title: 'Contact 2', key: 'contact2', type: CONTENT_TEXT},
    ],
  },
  'camp-v-next-js': {
    default: defaultType,
    index: [
      {title: 'Logo', key: 'logo', type: CONTENT_IMAGE},
      {title: 'Artikel', key: 'article', type: CONTENT_TEXT},
      {title: 'Slider', key: 'slider', type: CONTENT_MULTIPLE_IMAGE},
    ],
  },
  'worker-conf-next-js': {
    default: defaultType,
    index: [
      {title: 'Artikel', key: 'article', type: CONTENT_TEXT},
      {
        title: 'Speaker',
        key: 'speaker',
        type: CONTENT_CHILDS,
        config: [
          {title: 'Name', key: 'name', type: CONTENT_SINGLE_TEXT},
          {title: 'Project', key: 'project', type: CONTENT_SINGLE_TEXT},
          {title: 'Company', key: 'company', type: CONTENT_SINGLE_TEXT},
          {title: 'Twitter', key: 'twitter', type: CONTENT_SINGLE_TEXT},
          {title: 'Image', key: 'image', type: CONTENT_IMAGE},
        ],
      },
      {title: 'Slider', key: 'slider', type: CONTENT_CHILDS, config: TextSlider},
      {title: 'Main Sponsors', key: 'mainSponsors', type: CONTENT_CHILDS, config: ImageLink},
      {title: 'Sponsors', key: 'sponsors', type: CONTENT_CHILDS, config: ImageLink},
      {title: 'Partners', key: 'partners', type: CONTENT_CHILDS, config: ImageLink},
    ],
    content:[
      {title: 'Artikel', key: 'article', type: CONTENT_TEXT},
      {title: 'Slider', key: 'slider', type: CONTENT_MULTIPLE_IMAGE},
    ],
    team: [
      {
        title: 'Curators',
        key: 'curators',
        type: CONTENT_CHILDS,
        config: [
          {title: 'Name', key: 'name', type: CONTENT_SINGLE_TEXT},
          {title: 'Content', key: 'content', type: CONTENT_TEXT},
          {title: 'Twitter', key: 'twitter', type: CONTENT_SINGLE_TEXT},
          {title: 'Image', key: 'image', type: CONTENT_IMAGE},
        ],
      },
      {
        title: 'Hosts',
        key: 'hosts',
        type: CONTENT_CHILDS,
        config: [
          {title: 'Name', key: 'name', type: CONTENT_SINGLE_TEXT},
          {title: 'Content', key: 'content', type: CONTENT_TEXT},
          {title: 'Twitter', key: 'twitter', type: CONTENT_SINGLE_TEXT},
          {title: 'Image', key: 'image', type: CONTENT_IMAGE},
        ],
      },
    ],
  },
};

export const getContentTypes = () => {
  const project = config.getProjectKey();
  if (!contentDefinitions[project]) {
    return [];
  } else {
    return Object.keys(contentDefinitions[project]);
  }
};

export const getContentDefinition = (project, type) => {
  if (!contentDefinitions[project]) {
    return defaultType;
  }
  const ws = contentDefinitions[project];
  if (!ws[type]) {
    return defaultType;
  }
  return ws[type];
};
