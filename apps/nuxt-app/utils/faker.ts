import { faker } from '@faker-js/faker';
import type { UserInputType } from '@geins/types';
import { UserCustomerType, UserGenderType } from '@geins/types';
export const fake = {
  user: () => {
    const csex = faker.person.sex() as 'female' | 'male';
    let entityId = faker.string.numeric({ length: 12, exclude: ['0'] });
    let cgender = UserGenderType.Other;
    let ctype = UserCustomerType.Private;
    let companyName = '';
    if (faker.datatype.boolean()) {
      ctype = UserCustomerType.Organization;
      companyName = faker.company.name();
      entityId = faker.string.numeric({ length: 7, exclude: ['0'] });
    } else {
      if (csex === 'male') {
        cgender = UserGenderType.Male;
      } else if (csex === 'female') {
        cgender = UserGenderType.Female;
      }
    }

    const userObject = {
      email: faker.internet.email(),
      user: {
        newsletter: faker.datatype.boolean(),
        customerType: ctype,
        gender: UserGenderType.Other,
        entityId: entityId,
        metaData: JSON.stringify({ bio: faker.person.bio() }),
        address: {
          firstName: faker.person.firstName(csex),
          lastName: faker.person.lastName(),
          company: companyName,
          mobile: faker.phone.number(),
          phone: faker.phone.number(),
          entryCode: faker.string.numeric(4),
          addressLine1: faker.location.streetAddress(),
          addressLine2: faker.location.secondaryAddress(),
          addressLine3: faker.location.buildingNumber(),
          careOf: 'Care Doe',
          city: faker.location.city(),
          state: faker.location.state(),
          zip: faker.location.zipCode('#####'),
          country: faker.location.country(),
        },
      },
    };
    return userObject;
  },
};
