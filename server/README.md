# CMUSeats Server/Backend

## Setup Instructions

1. Use `.env.template` to create a `.env` file, and populate with the MongoDB connection URL.
2. Run `npm install` to install necessary dependencies.
3. Run `npm run dev` to run the backend in developer mode, this will watch for changes and automatically restart the server as necessary.

## Code Structure

See [this doc](https://docs.google.com/document/d/1pjmu1MVJJhfqudqVfQ4TDufrps3KHCVwBjF-swI_BgE/edit) for an overview of the implementation.

- `index.ts` is the main entrypoint, and includes the two endpoints.
- We're using [Prisma](https://www.prisma.io/docs) to interface with our database, so the schema is defined in `prisma/schema.prisma`
- The logic for the two endpoints are defined in `controllers/`
- All constants are defined in `util/constants.ts`
