## HomePointrCIC
**[HomePointrCIC](https://homepointr.com/)** is a nonprofit based in Scotland that focuses on improving access to suitable housing options and increasing occupancy rates. This webapp is an online platform to streamline the process for referral agencies to match homeless and vulnerable individuals to appropriate housing that landlords provide.

## Cal Blueprint
**[Cal Blueprint](http://www.calblueprint.org/)** is a student-run UC Berkeley
organization devoted to matching the skills of its members to our desire to see
social good enacted in our community. Each semester, teams of 4-5 students work
closely with a non-profit to bring technological solutions to the problems they
face every day.

## Local Setup
Pre-Setup: This project was set up on Whales a friendly Docker environment for Ruby on Rails. Please refer to this [page](https://www.notion.so/Installing-Whales-b9b8b49c27c64d7095649916108fd085) for Whales setup instructions. In each of the following steps, you'll notice us using whales commands instead of traditional rails commands.

1. Clone the homepointr repo `git clone https://github.com/calblueprint/HomePointrCIC.git`

2. Start your Docker.

3. Install all appropriate gems `whales run bundle install` and node modules `whales run npm i`. Note: After you have finished running a whales command before hand, you will be in the whales docker environment and no longer need to preface your commands with "whales run".

4. Run `rake db:create` and `rake db:migrate` to set up the database completely. (You do not need to preface these commands with "whales run" if you are already in the whales docker environment.)

5. After setup, exit out of your whales environment with command `exit`. Once you are in your computer's terminal environment, run `whales s` to start the server. Navigate to http://localhost:7331 to view the whales console and http://localhost:1337 to view the local version of your app.
