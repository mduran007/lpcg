import passport from "passport";
import request from "request";
import passportLocal from "passport-local";
import _ from "lodash";

// import { User, UserType } from '../models/User';
import { default as Usuario } from "../../model/Usuario";
import { Request, Response, NextFunction } from "express";


function mockLogin(username: String, password: String, done) {
    if ((username == 'admin') && (password == 'admin123')) {
        return true;
    } else {
        return false;
    }
}

//const DbLocalStrategy = new LocalStrategy(
//    function (username, password, done) {
//        User.findOne({ username: username }, function (err, user) {
//            if (err) { return done(err); }
//            if (!user) { return done(null, false); }
//            if (!user.verifyPassword(password)) { return done(null, false); }
//            return done(null, user);
//        });
//    }//
//)
//passport.use(DbLocalStrategy);


//const FacebookStrategy = passportFacebook.Strategy;
/*
passport.serializeUsuario<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUsuario((id, done) => {
  Usuario.findById(id, (err, user) => {
    done(err, user);
  });
});
/*

/**
 * Sign in using Email and Password.

passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
  Usuario.findOne({ email: email.toLowerCase() }, (err, user: any) => {
    if (err) { return done(err); }
    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` });
    }
    user.comparePassword(password, (err: Error, isMatch: boolean) => {
      if (err) { return done(err); }
      if (isMatch) {
        return done(undefined, user);
      }
      return done(undefined, false, { message: "Invalid email or password." });
    });
  });
}));
*/

/**
 * OAuth Strategy Overview
 *
 * - Usuario is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - Usuario is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */


/**
 * Sign in with Facebook.

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ["name", "email", "link", "locale", "timezone"],
  passReqToCallback: true
}, (req: any, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    Usuario.findOne({ facebook: profile.id }, (err, existingUsuario) => {
      if (err) { return done(err); }
      if (existingUsuario) {
        req.flash("errors", { msg: "There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account." });
        done(err);
      } else {
        Usuario.findById(req.user.id, (err, user: any) => {
          if (err) { return done(err); }
          user.facebook = profile.id;
          user.tokens.push({ kind: "facebook", accessToken });
          user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
          user.save((err: Error) => {
            req.flash("info", { msg: "Facebook account has been linked." });
            done(err, user);
          });
        });
      }
    });
  } else {
    Usuario.findOne({ facebook: profile.id }, (err, existingUsuario) => {
      if (err) { return done(err); }
      if (existingUsuario) {
        return done(undefined, existingUsuario);
      }
      Usuario.findOne({ email: profile._json.email }, (err, existingEmailUsuario) => {
        if (err) { return done(err); }
        if (existingEmailUsuario) {
          req.flash("errors", { msg: "There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings." });
          done(err);
        } else {
          const user: any = new Usuario();
          user.email = profile._json.email;
          user.facebook = profile.id;
          user.tokens.push({ kind: "facebook", accessToken });
          user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
          user.profile.gender = profile._json.gender;
          user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
          user.profile.location = (profile._json.location) ? profile._json.location.name : "";
          user.save((err: Error) => {
            done(err, user);
          });
        }
      });
    });
  }
}));

 */

/**
 * Login Required middleware.

export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
*/

/**
 * Authorization Required middleware.

export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const provider = req.path.split("/").slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
 */
