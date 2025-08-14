
# Create a Job Finding Application

## Part One

Your task is to build a job finding application named "JOB SEEKER". The initial implementation of the application will consist of a single view that will contain the following parts:

1. **A list of all the available jobs with an apply button.**
2. **A list of all the jobs you've applied to with a cancel application button.**
3. **A job posting list item** that will only show the most important things about a job and can be expanded to show more details, e.g., description, location, work type, or requirements.
4. **An info panel** that will contain the total number of available jobs and the total number of applied jobs (use computed for this).
5. **A sort panel** that will sort jobs based on starting salary and work type.

```typescript
{
    // Mandatory to be shown in the posting
    company: string;
    expires: string;
    position: string;
    startingSalary: number;
    workType: "remote" | "onsite" | "hybrid";
    // Show the below in the details expanding element
    location: string;
    country: string;
    qualifications: string;
    description: string;
    isApplied: boolean;
}
```

### Requirements

- Use mock data instead of a backend (will be added in later parts).
- The available jobs list needs to allow users to press a button to expand the posting and view the details. 
- By clicking "apply," the job posting is then transferred to the applied jobs list, where it can also be viewed with its details. The application can be canceled, which will return the posting to the available jobs list (use services to handle this functionality).

### Tips

Take your time to make it look good. The CSS is an important part of this homework.
