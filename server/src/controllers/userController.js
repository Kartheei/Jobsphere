import bcrypt from "bcryptjs";
import User from "../models/user.js";
import UserProfile from "../models/userProfile.js";
import generateToken from "../utils/generateToken.js";
import path from "path";
import fs from "fs";

// @desc - Register new user
// @access - public
export const registerUser = async (req, res, next) => {
  const { cfname, clname, cemail, cpassword, cconfirmPassword, role, eoname } =
    req.body;

  if (cpassword !== cconfirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const userExists = await User.findOne({ email: cemail });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name: `${cfname} ${clname}`,
      email: cemail,
      password: cpassword,
      role: role || "Candidate", // Default role is 'Candidate'
      organizationName: role === "Employer" ? eoname : undefined,
    });

    const createdUser = await user.save();

    // Generate and set the token
    generateToken(res, createdUser._id);

    // Return necessary user information
    const sanitizedUser = {
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
    };

    res
      .status(201)
      .json({ message: "User registered successfully", user: sanitizedUser });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
};

// @desc - Get user profile
// @access - private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("profile");

    if (user) {
      const userProfile = await UserProfile.findOne({ userId: req.user._id });

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: userProfile?.profilePicture || "",
        about: userProfile?.about || "",
        experience: userProfile?.experiences || [],
        education: userProfile?.education || [],
        address: userProfile?.address || {},
        contact: userProfile?.contact || "",
        dateOfBirth: userProfile?.dateOfBirth || null,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
};

// @desc - Update user profile
// @access - private
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user information
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    await user.save();

    // Validate that experiences and education are not empty arrays
    const experiences = req.body.experiences.filter(
      (exp) =>
        exp.jobTitle &&
        exp.companyName &&
        exp.durationFrom &&
        exp.durationTo &&
        exp.description
    );
    const education = req.body.education.filter(
      (edu) =>
        edu.degree &&
        edu.institutionName &&
        edu.yearsAttendedFrom &&
        edu.yearsAttendedTo &&
        edu.description
    );

    const profileFields = {
      about: req.body.about || "",
      experiences: experiences.length > 0 ? experiences : undefined,
      education: education.length > 0 ? education : undefined,
      address: req.body.address || {},
      contact: req.body.contact || "",
      dateOfBirth: req.body.dateOfBirth || null,
    };

    let profile = await UserProfile.findOneAndUpdate(
      { userId: req.user._id },
      { $set: profileFields },
      { new: true, upsert: true }
    );

    if (!profile) {
      profile = new UserProfile({
        userId: req.user._id,
        ...profileFields,
      });
      await profile.save();
    }

    res.status(200).json(profile);
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      console.log(req);
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userProfile = await UserProfile.findOne({ userId: req.user._id });
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    userProfile.resume = {
      filename: req.file.filename,
      mimeType: req.file.mimetype,
      path: req.file.path,
    };

    await userProfile.save();

    res.status(200).json({
      message: "Resume uploaded successfully",
      resume: userProfile.resume,
    });
  } catch (error) {
    console.error("Upload error:", error);
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Validation Error", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
};

export const getResume = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ userId: req.user._id });
    if (!userProfile || !userProfile.resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const filePath = userProfile.resume.path;
    const fileName = userProfile.resume.filename;

    // Check if file exists
    if (fs.existsSync(filePath)) {
      // Set the appropriate Content-Type
      res.setHeader("Content-Type", userProfile.resume.mimeType);
      // Set the Content-Disposition to attachment to suggest a file download with the original filename
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
      // Stream the file to the client
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    } else {
      return res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    console.error("Error fetching resume:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// @desc - Get candidate profile by ID
// @access - private
const getCandidateProfileById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("profile");

    if (user) {
      const userProfile = await UserProfile.findOne({ userId: userId });

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: userProfile?.profilePicture || "",
        about: userProfile?.about || "",
        experience: userProfile?.experiences || [],
        education: userProfile?.education || [],
        address: userProfile?.address || {},
        contact: userProfile?.contact || "",
        dateOfBirth: userProfile?.dateOfBirth || null,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
};

export { getUserProfile, updateUserProfile, getCandidateProfileById };
