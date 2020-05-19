import axios from 'axios';
import { resolve } from 'path';
import { GatsbyCreatePages, GatsbySourceNodes } from './types';
import { PageContext } from '@src/pages-template/karutas/no';
import { Karuta } from '@src/domain/models';
import { KarutaJsonResponse } from '@src/infrastructure/responses/KarutaJsonResponse';

const KARUTA_JSON_URL =
  'https://raw.githubusercontent.com/rei-m/android_hyakuninisshu/develop/infrastructure/src/main/assets/karuta_list_v_2.json';

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

  (result.data.allKaruta.edges as Array<any>).map((data) => {
    const karuta = JSON.parse(data.node.internal.content) as Karuta;
    const context: PageContext = {
      karuta,
    };

    createPage({
      path: `/karutas/${karuta.no}`,
      component: resolve(`./src/pages-template/karutas/no.tsx`),
      context,
    });
  });
};

export const sourceNodes: GatsbySourceNodes<Karuta> = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  const response = await axios.get<KarutaJsonResponse>(KARUTA_JSON_URL);
  if (response.status === 200) {
    const json = response.data;
    json.karuta_list.forEach((kr) => {
      const id = createNodeId(`karuta-${kr.id}`);
      const karuta: Karuta = {
        id,
        no: kr.id,
        imageNo: kr.image_no,
        creator: kr.creator,
        shoku: {
          kana: kr.first_kana,
          kanji: kr.first_kanji,
        },
        niku: {
          kana: kr.second_kana,
          kanji: kr.second_kanji,
        },
        sanku: {
          kana: kr.third_kana,
          kanji: kr.third_kanji,
        },
        shiku: {
          kana: kr.fourth_kana,
          kanji: kr.fourth_kanji,
        },
        kekku: {
          kana: kr.fifth_kana,
          kanji: kr.fifth_kanji,
        },
        kimariji: kr.kimariji as any,
        color: kr.color as any,
        translation: kr.translation,
      };
      const nodeContent = JSON.stringify(karuta);
      const nodeMeta = {
        id,
        parent: undefined,
        children: [],
        internal: {
          type: `Karuta`,
          content: nodeContent,
          contentDigest: createContentDigest(karuta as any),
        },
      };
      createNode({ ...karuta, ...nodeMeta } as any);
    });
  } else {
    throw new Error('sourceNodes failed');
  }
};
