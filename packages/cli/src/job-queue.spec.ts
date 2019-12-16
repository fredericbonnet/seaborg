import 'mocha';
import { expect } from 'chai';

import {
  Job,
  JobQueue,
  JobQueueFactory,
  SimpleJobQueueAdapter,
  PooledJobQueueAdapter,
} from './job-queue';

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

  it('runs several jobs asynchronously', async () => {
    const jobs = [
      jobQueue.enqueue(async () => 1),
      jobQueue.enqueue(async () => 2),
      jobQueue.enqueue(async () => 3),
    ];
    const results = await Promise.all(jobs);
    expect(results).to.eql([1, 2, 3]);
  });
});

describe('SimpleJobQueueAdapter', () => {
  let jobQueue: JobQueue;
  beforeEach(() => {
    jobQueue = new SimpleJobQueueAdapter();
  });

  it('runs all jobs in parallel', async () => {
    let sequence: any[] = [];
    const jobs = [
      jobQueue.enqueue(
        () =>
          new Promise((resolve, reject) => {
            sequence.push('a');
            setTimeout(() => {
              sequence.push('b');
              resolve(1);
            }, 0);
          })
      ),
      jobQueue.enqueue(async () => {
        sequence.push('c');
        return 2;
      }),
    ];
    const results = await Promise.all(jobs);
    expect(results).to.eql([1, 2]);
    expect(sequence).to.eql(['a', 'c', 'b']);
  });
});

describe('PooledJobQueueAdapter', () => {
  specify('with pool capacity = 1', async () => {
    const jobQueue = new PooledJobQueueAdapter(1);
    let sequence: any[] = [];
    const jobs = [
      jobQueue.enqueue(
        () =>
          new Promise((resolve, reject) => {
            sequence.push('a');
            setTimeout(() => {
              sequence.push('b');
              resolve(1);
            }, 0);
          })
      ),
      jobQueue.enqueue(async () => {
        sequence.push('c');
        return 2;
      }),
    ];
    const results = await Promise.all(jobs);
    expect(results).to.eql([1, 2]);
    expect(sequence).to.eql(['a', 'b', 'c']);
  });
  specify('with pool capacity = 2', async () => {
    const jobQueue = new PooledJobQueueAdapter(2);
    let sequence: any[] = [];
    const jobs = [
      jobQueue.enqueue(
        () =>
          new Promise((resolve, reject) => {
            sequence.push('a');
            setTimeout(() => {
              sequence.push('b');
              resolve(1);
            }, 0);
          })
      ),
      jobQueue.enqueue(
        () =>
          new Promise((resolve, reject) => {
            sequence.push('c');
            setTimeout(() => {
              sequence.push('d');
              resolve(2);
            }, 0);
          })
      ),
      jobQueue.enqueue(async () => {
        sequence.push('e');
        return 3;
      }),
    ];
    const results = await Promise.all(jobs);
    expect(results).to.eql([1, 2, 3]);
    expect(sequence).to.eql(['a', 'c', 'b', 'd', 'e']);
  });
});
