/** Job function */
export type Job = (context?: any) => Promise<any>;

/**
 * Job queue interface
 * */
export interface JobQueue {
  /**
   * Enqueue a job
   *
   * @param job Job function to enqueue
   */
  enqueue(job: Job): Promise<any>;
}

/**
 * Simple job queue implementation, simply run the jobs immediately
 */
export class SimpleJobQueueAdapter implements JobQueue {
  /** Queue context */
  private context: any;

  constructor() {}

  /**
   * Initialize context for the job queue
   *
   * @param fn Context init function
   */
  initContext(fn: () => any) {
    this.context = fn();
  }

  enqueue(job: Job) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        job(this.context)
          .then(resolve)
          .catch(reject);
      }, 0);
    });
  }
}

/**
 * Pooled job queue implementation, limit the number of parallel jobs
 */
export class PooledJobQueueAdapter implements JobQueue {
  /** Queue context (one per pool entry) */
  private context: any[] = [];

  /** Enqueued jobs */
  private jobs: {
    job: Job;
    resolve: Function;
    reject: Function;
  }[] = [];

  /** Running jobs */
  private runningJobs: Job[] = [];

  /** Number of running jobs  */
  private nbRunningJobs: number = 0;

  /**
   * Constructor
   *
   * @param capacity Pool capacity
   */
  constructor(public capacity: number) {
    this.runningJobs.length = capacity;
    this.context.length = capacity;
  }

  /**
   * Initialize context for each pool entry
   *
   * @param fn Context init function
   */
  initContext(fn: (index: number) => any) {
    for (let i = 0; i < this.capacity; i++) {
      this.context[i] = fn(i);
    }
  }

  enqueue(job: Job): Promise<any> {
    return new Promise((resolve, reject) => {
      this.jobs.push({ job, resolve, reject });
      this.processQueue();
    });
  }

  /** Run all jobs up to the pool capacity */
  private processQueue() {
    while (this.jobs.length && this.nbRunningJobs < this.capacity) {
      this.runNextJob();
    }
  }

  /** Run next job in first free pool */
  private runNextJob() {
    if (!this.jobs.length) return;
    // @ts-ignore
    const { job, resolve, reject } = this.jobs.shift();

    const freePool = this.runningJobs.findIndex(e => !e);
    this.runningJobs[freePool] = job;
    this.nbRunningJobs++;
    setTimeout(() => {
      job(this.context[freePool])
        .then(resolve)
        .catch(reject)
        .finally(() => {
          delete this.runningJobs[freePool];
          this.nbRunningJobs--;
          this.processQueue();
        });
    }, 0);
  }
}

/** Job queue factory */
export class JobQueueFactory {
  static create(): JobQueue {
    return new SimpleJobQueueAdapter();
  }
  static createPooled(capacity: number): JobQueue {
    return new PooledJobQueueAdapter(capacity);
  }
}

/** Default instance */
const instance: JobQueue = JobQueueFactory.create();
export default instance;
