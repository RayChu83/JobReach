import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: String,
    description: String,
    applications: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "jobs",
      },
    ],
    email: String,
    password: String,
    experience: [
      {
        jobTitle: String,
        jobCompany: String,
        jobDescription: String,
        id: String,
      },
    ],
  },
  { timestamps: true }
);

const jobSchema = new Schema(
  {
    title: String,
    description: String,
    applied: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users",
      },
    ],
    company: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "companies",
    },
  },
  { timestamps: true }
);

const companiesSchema = new Schema(
  {
    name: String,
    description: String,
    listings: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "jobs",
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const Users =
  mongoose.models.users || mongoose.model("users", userSchema);
export const Jobs = mongoose.models.jobs || mongoose.model("jobs", jobSchema);
export const Companies =
  mongoose.models.companies || mongoose.model("companies", companiesSchema);
