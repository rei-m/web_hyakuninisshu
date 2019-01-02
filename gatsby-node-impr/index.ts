import { GatsbyCreatePages, GatsbySourceNodes } from './types';
import axios from 'axios';
import { Karuta } from '../src/types';
import { resolve } from 'path';

const KARUTA_JSON_URL =
  'https://raw.githubusercontent.com/rei-m/android_hyakuninisshu/develop/app/src/main/assets/karuta_list.json';

const convertCamelKey = <T>(json: { [key: string]: any }, result: T) => {
  convert(json, result);
};

const convert = (value: any, result: { [key: string]: any }) => {
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      if (isPrimitive(value[key])) {
        result[snakeToCamel(key)] = value[key];
      } else if (Array.isArray(value[key])) {
        result[snakeToCamel(key)] = value[key].map((v: any) => {
          const itemResult = {};
          convert(v, itemResult);
          return itemResult;
        });
      } else {
        const child = {};
        convert(value[key], child);
        result[snakeToCamel(key)] = child;
      }
    }
  }
};

const isPrimitive = (v: any) => {
  return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || typeof v === 'undefined';
};

const snakeToCamel = (v: string) => {
  return v.replace(/_./g, s => s.charAt(1).toUpperCase());
};

export const createPages: GatsbyCreatePages<{ karuta: Karuta }> = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allKaruta {
        edges {
          node {
            internal {
              content
            }
          }
        }
      }
    }
  `);
  result.data.allKaruta.edges.map(data => {
    const karuta = JSON.parse(data.node.internal.content) as Karuta;
    createPage({
      path: `/karutas/${karuta.no}`,
      component: resolve(`./src/templates/karutas.tsx`),
      context: {
        karuta,
      },
    });
  });
};

export const sourceNodes: GatsbySourceNodes<Karuta> = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  const response = await axios.get(KARUTA_JSON_URL);
  if (response.status === 200) {
    const json = response.data;
    const data = {};
    convertCamelKey<{ karutaList?: Karuta[] }>(json, data);

    // tslint:disable-next-line:no-string-literal
    data['karutaList']!.forEach(karuta => {
      const id = createNodeId(`karuta-${karuta.id}`);
      const fixed = { ...karuta, no: karuta.id, id };
      const nodeContent = JSON.stringify(fixed);
      const nodeMeta = {
        id,
        parent: undefined,
        children: [],
        internal: {
          type: `Karuta`,
          content: nodeContent,
          contentDigest: createContentDigest(fixed),
        },
      };
      createNode({ ...fixed, ...nodeMeta });
    });
  } else {
    throw new Error('sourceNodes failed');
  }
};

// export const onCreatePage: GatsbyOnCreatePage<{ todo: Todo }> = async ({ page, actions }) => {
//   const { createPage } = actions;

//   // page.matchPath is a special key that's used for matching pages
//   // only on the client.
//   if (page.path.match(/^\/todos/)) {
//     page.matchPath = '/todos/:id';
//     createPage(page);
//   }
// };
