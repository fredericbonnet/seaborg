/** Job function */
export type Job = () => Promise<any>;

/**
 * Job queue interface
 * */
export interface JobQueue {
  enqueue(job: Job): Promise<any>;
}

/**
 * Simple job queue implementation, simply run the jobs immediately
 */
class SimpleJobQueueAdapter implements JobQueue {
  enqueue(job: Job) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(job());
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  }
}

/** Job queue factory */
export class JobQueueFactory {
  static create(): JobQueue {
    return new SimpleJobQueueAdapter();
  }
}

/** Singleton instance */
const instance: JobQueue = JobQueueFactory.create();
export default instance;
