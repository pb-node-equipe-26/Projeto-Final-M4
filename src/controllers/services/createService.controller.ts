import { Request, Response } from "express";
import createServiceService from "../../services/services/createService.service";
import { AppError } from "../../errors/appError";

const createServiceController = async (req: Request, res: Response) => {
  const { serviceName, serviceOwner, isActive, description, category } =
    req.body;

  const newService = await createServiceService({
    serviceName,
    serviceOwner,
    isActive,
    description,
    category,
  });

  return res.status(201).send(newService);
};

export default createServiceController;
