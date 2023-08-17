import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { writeFileSync } from 'fs';
import { env } from '~config/env.config';

@Injectable()
export class ExportDistrictsService {
  async exportDistricts(): Promise<string> {
    let exportData = '';
    try {
      const districtsData = await axios.get(
        `${env.APIS.PROVINCES_OPEN_API}/d/`,
      );
      Object.keys(districtsData.data[0]).forEach((value, index) => {
        if (index !== 0) {
          exportData += ',';
        }
        exportData += value;
      });
      exportData += '\n';
      districtsData.data.forEach((value) => {
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
      await writeFileSync(`src/seeder/data/districts.csv`, exportData, 'utf8');
      return 'Districts Data Exported';
    } catch (err) {
      return `Error Export csv seed District: ${err}`;
    }
  }
}
