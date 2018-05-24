import {
  CONTENT_CHILDS,
  CONTENT_IMAGE,
  CONTENT_SINGLE_TEXT,
  CONTENT_TEXT,
} from './arkulpa-fec/components/Content/contentConstants';
import config from './config';

const textSnippet = [{title: 'Text', key: 'text', type: CONTENT_TEXT}];

const snippetDefinitions = {
  'arkulpa-next-js': {
    text: textSnippet,
  },
  'stanztech-next-js': {
    text: textSnippet,
  },
  'camp-v-next-js': {
    text: textSnippet,
  },
  'worker-conf-next-js': {
    text: textSnippet,
    speaker: [
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
    ],
    talks: [
      {
        title: 'Talks',
        key: 'talks',
        type: CONTENT_CHILDS,
        config: [
          {title: 'Time', key: 'time', type: CONTENT_SINGLE_TEXT},
          {title: 'Title', key: 'title', type: CONTENT_SINGLE_TEXT},
          {title: 'Speaker', key: 'speaker', type: CONTENT_SINGLE_TEXT},
          {title: 'Description', key: 'description', type: CONTENT_TEXT},
          {title: 'Bio', key: 'bio', type: CONTENT_TEXT},
          {title: 'TicketUrl', key: 'ticketUrl', type: CONTENT_SINGLE_TEXT},
        ],
      },
    ],
  },
};

export const getSnippetTypes = () => {
  const project = config.getProjectKey();
  if (!snippetDefinitions[project]) {
    return [];
  } else {
    return Object.keys(snippetDefinitions[project]);
  }
};

export const getSnippetDefinition = (project, type) => {
  if (!snippetDefinitions[project]) {
    return textSnippet;
  }
  const ws = snippetDefinitions[project];
  if (!ws[type]) {
    return textSnippet;
  }
  return ws[type];
};
