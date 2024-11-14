import { Injectable } from '@nestjs/common';
import { JumboResponseDto } from './common/dto/jumboResponse.dto';
import * as uuid from 'uuid';
@Injectable()
export class AppService {
  async getProducts(queryProduct: string) {
    queryProduct = queryProduct.replaceAll('.', '').toLowerCase();
    const jumboProducts = await this.getJumboProducts(queryProduct);
    const carrefourProducts = await this.getCarrefourProducts(queryProduct);
    const veaProducts = await this.getVeaProducts(queryProduct);
    const comodinProducts = await this.getComodinProducts(queryProduct);
    const cotoProudcts = await this.getCotoProducts(queryProduct);
    const results: JumboResponseDto[] = [
      ...carrefourProducts,
      ...cotoProudcts,
      ...jumboProducts,
      ...veaProducts,
      ...comodinProducts,
    ];

    // const filteredResults = results.reduce((acc, item) => {
    //   const ean = item.ean;
    //   if (!acc[ean]) {
    //     acc[ean] = [];
    //   }
    //   acc[ean].push(item);
    //   return acc;
    // }, {});

    // filteredResults = Object.values(filteredResults).sort(
    //   (a: [], b: []) => b.length - a.length,
    // );

    return results;
  }

  private async getCotoProducts(queryProduct: string) {
    const nnt = encodeURIComponent(queryProduct);
    const url = `https://api.cotodigital.com.ar/sitios/cdigi/categoria?Ntt=${nnt}&format=json`;
    const response = await fetch(url);

    let data = await response.json();

    data = data.contents[0].Main[1].contents[0].records;

    data = data.map((item) => {
      return {
        ...item.records[0].attributes,
      };
    });

    let products = [];

    data.forEach((object) => {
      const newProduct = {};
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          newProduct[key.split('.')[1] + ''] = object[key][0];
        }
      }
      products.push(newProduct);
    });

    products = products.map((product) => {
      const {
        description: name,
        eanPrincipal: ean,
        largeImage: images,
        activePrice: ListPrice,
        siteId: sellerName,
      } = product;

      const seller = {
        sellerName,
        ofertas: [],
        sellerLogo:
          'https://static.cotodigital3.com.ar/sitios/cdigi/static/content/images/nuevositio/header/LogoCOTO.svg',
      };
      const id = uuid.v4();
      return {
        id,
        name,
        ean,
        images,
        ListPrice,
        Price: ListPrice,
        seller,
      };
    });

    return products;
  }

  private async getCarrefourProducts(queryProduct: string) {
    const data = await this.getData(
      'https://www.carrefour.com.ar',
      queryProduct,
    );

    let queryData = data.queryData;
    if (queryData) {
      queryData = queryData.map((element) => {
        return JSON.parse(element.data);
      });

      const productSearch = queryData[0].productSearch;

      let products = productSearch.products.map((product) => {
        return {
          ...product.items,
        };
      });

      products = productSearch.products.map((product) => {
        return { ...product };
      });

      products = productSearch.products.map((product) => {
        return product.items[0];
      });

      products = productSearch.products.map((product) => {
        const { name, ean, sellers } = product.items[0];
        let { images } = product.items[0];
        images = images[0].imageUrl;

        const { sellerName, commertialOffer } = sellers[0];
        const { teasers, Price, ListPrice } = commertialOffer;
        const ofertas = [];

        teasers.forEach((teaser) => {
          if (!teaser.name.toLowerCase().includes('tarjeta')) {
            ofertas.push(teaser);
          }
        });
        const id = uuid.v4();

        const seller = {
          sellerName,
          ofertas,
          sellerLogo:
            'https://carrefourar.vtexassets.com/assets/vtex/assets-builder/carrefourar.theme/78.3.0/logo/logo___8ebc4231614a7b41a4258354ce76e1e1.svg',
        };

        return { id, name, ean, images, seller, Price, ListPrice };
      });
      return products;
    }
    return [];
  }

  private async getJumboProducts(queryProduct: string) {
    const data = await this.getData('https://www.jumbo.com.ar', queryProduct);

    let queryData = data.queryData;
    if (queryData) {
      queryData = queryData.map((element) => {
        return JSON.parse(element.data);
      });

      const productSearch = queryData[0].productSearch;

      let products = productSearch.products.map((product) => {
        return {
          ...product.items,
        };
      });

      products = productSearch.products.map((product) => {
        return { ...product };
      });

      products = productSearch.products.map((product) => {
        return product.items[0];
      });

      products = productSearch.products.map((product) => {
        const { name, ean, sellers } = product.items[0];
        let { images } = product.items[0];
        images = images[0].imageUrl;

        const { sellerName, commertialOffer } = sellers[0];
        const { teasers, Price, ListPrice } = commertialOffer;
        const ofertas = [];

        teasers.forEach((teaser) => {
          if (!teaser.name.toLowerCase().includes('tarjeta')) {
            ofertas.push(teaser);
          }
        });
        const id = uuid.v4();

        const seller = {
          sellerName,
          sellerLogo:
            'https://jumboargentinaio.vtexassets.com/assets/vtex/assets-builder/jumboargentinaio.store-theme/4.0.55/img/logo-jumbo___298a91c7745ef5319749159e7332eec5.svg',
          ofertas,
        };

        return { id, name, ean, images, seller, Price, ListPrice };
      });
      return products;
    }
    return [];
  }

  private async getVeaProducts(queryProduct: string) {
    const data = await this.getData('https://www.vea.com.ar', queryProduct);

    let queryData = data.queryData;
    if (queryData) {
      queryData = queryData.map((element) => {
        return JSON.parse(element.data);
      });

      const productSearch = queryData[0].productSearch;

      let products = productSearch.products.map((product) => {
        return {
          ...product.items,
        };
      });

      products = productSearch.products.map((product) => {
        return { ...product };
      });

      products = productSearch.products.map((product) => {
        return product.items[0];
      });

      products = productSearch.products.map((product) => {
        const { name, ean, sellers } = product.items[0];
        let { images } = product.items[0];
        images = images[0].imageUrl;

        const { sellerName, commertialOffer } = sellers[0];
        const { teasers, Price, ListPrice } = commertialOffer;
        const ofertas = [];

        teasers.forEach((teaser) => {
          if (!teaser.name.toLowerCase().includes('tarjeta')) {
            ofertas.push(teaser);
          }
        });
        const id = uuid.v4();

        const seller = {
          sellerName,
          ofertas,
          sellerLogo:
            'https://veaargentina.vtexassets.com/assets/vtex.file-manager-graphql/images/90afb408-ae59-49dc-93d3-024dfad89cb3___512e889dc7a3dba0a62a4b47dffde6d1.png',
        };

        return { id, name, ean, images, seller, Price, ListPrice };
      });
      return products;
    }
    return [];
  }

  private async getComodinProducts(queryProduct: string) {
    const busqueda = encodeURIComponent(queryProduct);
    const url = `https://www.comodinencasa.com.ar/api/catalog_system/pub/products/search/busca?O=OrderByTopSaleDESC&ft=${busqueda}`;

    const response = await fetch(url);
    let products = await response.json();

    products = products.map((product) => {
      return product.items[0];
    });

    products = products.map((product) => {
      const { name, ean, sellers } = product;
      let { images } = product;
      const { sellerName, commertialOffer } = sellers[0];
      const { Teasers = [], Price, ListPrice } = commertialOffer;
      const id = uuid.v4();

      images = images[0].imageUrl;
      const seller = {
        sellerName,
        ofertas: Teasers,
        sellerLogo:
          'http://supermercadoscomodin.com/wp-content/uploads/2019/06/logo-COMODIN-1-1.png',
      };
      return { id, name, ean, images, seller, Price, ListPrice };
    });

    return products;
  }

  private async getData(urlShop: string, queryProduct: string) {
    const appsEtag = `appsEtag%2Cblocks%2CblocksTree%2Ccomponents%2CcontentMap%2Cextensions%2Cmessages%2Cpage%2Cpages%2Cquery%2CqueryData%2Croute%2CruntimeMeta%2Csettings`;
    const map = `ft`;
    const search = encodeURIComponent(queryProduct);
    const url = `${urlShop}/${search}?_q=${search}&_map=${map}&__pickRuntime=${appsEtag}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}
