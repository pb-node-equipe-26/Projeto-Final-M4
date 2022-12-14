import AppDataSource from "../../data-source";
import { Services } from "../../entities/services.entity";
import { Description } from "../../entities/description.entity";
import { Categories } from "../../entities/categories.entity";
import { IServiceRequest, IDescription } from "../../interfaces/services";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";

const createServiceService = async ({
  serviceName,
  isActive,
  description,
  category,
  user,
  req_user
}: IServiceRequest): Promise<any> => {
  const serviceRepository = AppDataSource.getRepository(Services);

  const descriptionRepository = AppDataSource.getRepository(Description);

  const categoryRepository = AppDataSource.getRepository(Categories);

  const userRepository = AppDataSource.getRepository(User);
  
  const id = user || req_user.userId;

  const userId = await userRepository.findOne({
    where: { id : id},
  });
  
  if (!userId) {
    throw new AppError("User not found", 404);
  }

  if (req_user === false) {
    throw new AppError("User is not offering");
  }

  const categoryId = await categoryRepository.findOne({
    where: { id: category },
  });

  if (!categoryId) {
    throw new AppError("Category not found", 404);
  }

  const serviceDescription: IDescription = descriptionRepository.create({
    ...description,
    atuationArea: categoryId.name,
  });

  await descriptionRepository.save(serviceDescription);

  const service = serviceRepository.create({
    serviceName,
    serviceOwner: userId.name ? userId.name : req_user.name,
    isActive,
    description: serviceDescription,
    category: categoryId,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: userId ? userId : req_user.id,
  });

  await serviceRepository.save(service);

  const { password, ...rest } = service.user;
  return {
    ...service,
    user: rest,
  };
};

export default createServiceService;
