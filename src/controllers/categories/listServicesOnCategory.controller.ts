import {Request,Response} from 'express';
import listServicesOnCategoryService from '../../services/categories/listServicesOnCategory.service';

const listServicesOnCategoryController = async (req:Request,res:Response) => {
    const {id} = req.params;
    const services = await listServicesOnCategoryService({id});

    return res.json(services);
}

export default listServicesOnCategoryController;