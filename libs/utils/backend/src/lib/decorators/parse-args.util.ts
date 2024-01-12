import { Query } from '@nestjs/common';

export const ParseArgs = (argsPropertyName = 'args') =>
  Query(argsPropertyName, {
    transform: (args) => (args ? JSON.parse(args) : null),
  });
