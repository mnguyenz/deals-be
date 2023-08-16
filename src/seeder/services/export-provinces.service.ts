import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { writeFileSync } from 'fs';
import { env } from '~config/env.config';

@Injectable()
export class ExportProvincesService {
  async seedProvince(): Promise<string> {
    let exportData = '';
    try {
      const provincesData = await axios.get(
        `${env.APIS.PROVINCES_OPEN_API}/p/`,
      );
      Object.keys(provincesData.data[0]).forEach((value, index) => {
        if (index !== 0) {
          exportData += ',';
        }
        exportData += value;
      });
      exportData += '\n';
      provincesData.data.forEach((value) => {
        Object.values(value).forEach((value, index) => {
          if (index !== 0) {
            exportData += ',';
          }
          exportData += value;
        });
        exportData += '\n';
      });
    } catch (err) {
      return `Error call API in seedProvince: ${err}`;
    }

    try {
      await writeFileSync(`src/seeder/data/provinces.csv`, exportData, 'utf8');
      return 'Provinces Data Exported';
    } catch (err) {
      return `Error Export csv seedProvince: ${err}`;
    }
  }
}
