/**
 * Digital Menu Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ProductTemplateReadDto } from './productTemplateReadDto';


export interface ProductListTemplateReadDto { 
    id?: number;
    title?: string | null;
    boxId?: number | null;
    maxSize?: number | null;
    location?: number | null;
    products?: Array<ProductTemplateReadDto> | null;
}
