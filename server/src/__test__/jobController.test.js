import { createJob, getAllJobs } from '../src/controllers/jobController';
import { jobs as Job } from '../src/models/job';

jest.mock('../src/models/job');

describe('Job Controller', () => {
  describe('createJob', () => {
    it('should create a job successfully', async () => {
      const req = {
        body: {
          title: 'Job Title',
          description: 'Job Description',
          location: 'Job Location',
          salary: 'Job Salary',
          requirements: 'Job Requirements',
          job_type: 'Full-Time',
        },
        user: { _id: '1', role: 'Employer' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      const job = { save: jest.fn().mockResolvedValue({}) };
      Job.mockImplementation(() => job);

      await createJob(req, res, next);

      expect(Job).toHaveBeenCalledWith({
        title: 'Job Title',
        description: 'Job Description',
        location: 'Job Location',
        salary: 'Job Salary',
        requirements: 'Job Requirements',
        job_type: 'Full-Time',
        userId: '1'
      });
      expect(job.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Job posted successfully', job: {} });
    });

    it('should handle unauthorized user', async () => {
      const req = { body: {}, user: { _id: '1', role: 'Candidate' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await createJob(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized to create a job' });
    });
  });

  describe('getAllJobs', () => {
    it('should fetch all jobs successfully', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      Job.find.mockResolvedValue([{ title: 'Job Title' }]);

      await getAllJobs(req, res, next);

      expect(Job.find).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ title: 'Job Title' }]);
    });
  });
});
