import bcrypt from "bcryptjs";
import User from "../models/user.js";
import UserProfile from "../models/userProfile.js";
import generateToken from "../utils/generateToken.js";

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
        exp.jobTitle && exp.companyName && exp.duration && exp.description
    );
    const education = req.body.education.filter(
      (edu) =>
        edu.degree &&
        edu.institutionName &&
        edu.yearsAttended &&
        edu.description
    );

    const profileFields = {
      about: req.body.about || "",
      experiences: experiences.length > 0 ? experiences : undefined,
      education: education.length > 0 ? education : undefined,
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

export { getUserProfile, updateUserProfile };
