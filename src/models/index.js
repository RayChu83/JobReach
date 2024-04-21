import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const jobSchema = new Schema(
  {
    title: String,
    description: String,
    company: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "companys",
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

export const Jobs = mongoose.models.jobs || mongoose.model("jobs", taskSchema);
export const Companies = mongoose.models.companies || mongoose.model("companies", companiesSchema)
