# Homework part 2

We are going to continue building our job seeker applicaton by adding the following features

1. Routing, we are going to add multiple pages to our application
2. Pipes, built-in and custom pipes are going to be added

## Requirements

1. Add the following pages with routing to your application:

   1. Home page - A page containing a heading and some image (remember images are stored and public)
   2. Jobs page - A page containg the available and applied jobs that you built in the first homework
   3. Profile page - Page containing information about the user such as: personal information, work experince, current work status (basically similar to a linkedIn profile page)
   4. Company Page - A page simply containing details about a specfic company, this page is reached when clicking on the company name in the jobs page and it should be dynamic (ex: /company/:id)
   5. Not Found Page - Same as we did in class, this page loads when we enter a url that doesn't exist

2. Add pipes for your data in the application:
   1. The starting salary should have a currency and a decimal point
   2. The end date of the job should be a valid date
   3. Create an input and bind it using "[(ngModel)]" and model and create a custom filter pipe that will allow us to search through the jobs (use the one from class for inspiration)
