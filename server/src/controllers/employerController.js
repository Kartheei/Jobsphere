import User from "../models/user.js";
import Company from "../models/Company.js";

export const getEmployerProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select(
      "organizationName role"
    );

    if (!user || user.role !== "Employer") {
      return res.status(404).json({ message: "Employer not found" });
    }

    const company = await Company.findOne({ user_id: req.user._id });

    res.status(200).json({
      organizationName: user.organizationName,
      ...(company ? company.toObject() : {}),
    });
  } catch (error) {
    next(error);
  }
};

export const updateEmployerProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || user.role !== "Employer") {
      return res.status(404).json({ message: "Employer not found" });
    }

    let company = await Company.findOne({ user_id: req.user._id });

    if (!company) {
      company = new Company({ user_id: req.user._id });
    }

    // Update user fields
    if (req.body.organizationName) {
      user.organizationName = req.body.organizationName;
    }

    // Update company fields
    const companyFields = ["website", "industry", "location", "aboutCompany"];
    companyFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        company[field] = req.body[field];
      }
    });

    // Update insights
    if (req.body.insights) {
      company.insights = { ...company.insights, ...req.body.insights };
    }

    await user.save();
    await company.save();

    res.status(200).json({
      organizationName: user.organizationName,
      ...company._doc,
    });
  } catch (error) {
    next(error);
  }
};
