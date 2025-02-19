import { ContentAreaVariables, ContentAreaType } from '@geins/core';
import { BaseApiService } from '@geins/core';
import { queries } from '../graphql';
import * as contentParsers from '../parsers/contentParsers';
export class ContentAreaService extends BaseApiService {
  private async generateVars(variables: ContentAreaVariables) {
    if (!variables.areaName || !variables.family) {
      throw new Error('areaName and family is required');
    }
    return this.createVariables(variables);
  }
  async getRaw(variables: ContentAreaVariables) {
    const options: any = {
      query: queries.contentArea,
      variables: await this.generateVars(variables),
    };
    return await this.runQuery(options);
  }

  async get(variables: ContentAreaVariables) {
    const options: any = {
      query: queries.contentArea,
      variables: await this.generateVars(variables),
    };
    return await this.runQueryParsed(options);
  }

  protected parseResult(result: any): ContentAreaType {
    return contentParsers.parseContentArea(result);
  }
}
