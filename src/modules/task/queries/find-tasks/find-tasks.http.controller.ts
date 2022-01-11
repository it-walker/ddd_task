import { routesV1 } from '@config/app.routes';
import { UserHttpResponse } from '@modules/user/dtos/user.response.dto';
import { Body, Controller, Get, HttpStatus } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result } from '@src/libs/ddd/domain/utils/result.util';
import { TaskEntity } from '@src/modules/task/domain/entities/task.entity';
import { FindTasksQuery } from '@src/modules/task/queries/find-tasks/find-tasks.query';
import { FindTasksHttpRequest } from '@src/modules/task/queries/find-tasks/find-tasks.request.dto';

import { TaskHttpResponse } from '../../dtos/task.response.dto';

@Controller(routesV1.version)
/**
 * FindTasksHttpController class
 */
export class FindTasksHttpController {
  /**
   * constructor
   * @param {QueryBus} queryBys
   */
  constructor(private readonly queryBys: QueryBus) {}

  @Get(routesV1.task.root)
  @ApiOperation({ summary: 'Find tasks' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TaskHttpResponse,
  })
  /**
   *
   */
  async findTasks(
    @Body() request: FindTasksHttpRequest,
  ): Promise<TaskHttpResponse[]> {
    const query = new FindTasksQuery(request);
    const result: Result<TaskEntity[]> = await this.queryBys.execute(query);

    /* Returning Response classes which are responsible
       for whitelisting data that is sent to the user */
    return result.unwrap().map((task) => {
      return new TaskHttpResponse(task);
    });
  }
}
