import 'mocha';
import { expect } from 'chai';

import { Job, JobQueue, JobQueueFactory } from './job-queue';

describe('JobQueue', () => {
  let jobQueue: JobQueue;
  beforeEach(() => {
    jobQueue = JobQueueFactory.create();
  });

  it('runs one job asynchronously', async () => {
    let complete = false;
    const job: Job = async () => {
      complete = true;
      return 'done';
    };
    const p = jobQueue.enqueue(job);
    expect(complete).to.be.false;
    const result = await p;
    expect(complete).to.be.true;
    expect(result).to.eql('done');
  });

  it('runs several jobs in parallel', async () => {
    const jobs = [
      jobQueue.enqueue(async () => 1),
      jobQueue.enqueue(async () => 2),
      jobQueue.enqueue(async () => 3),
    ];
    const results = await Promise.all(jobs);
    expect(results).to.eql([1, 2, 3]);
  });
});
