import { Request, Response } from "express";
import { NextError } from "../../../types/declaration";
import Ad from "../../models/Ad.model";
import { createSearchQuery } from "../../utils/createSearchQuery";

const getAll = async (req: Request, res: Response, next: NextError) => {
  try {
    if (typeof req.query.search === 'string') {
      const requestedAds = await Ad.find({
        title: { $regex: createSearchQuery(req.query.search) },
      });
      if (!requestedAds.length) {
        return next({ status: 404, message: 'Could not find any ads data.' });
      }
      return res.json(requestedAds);
    }
    const allAds = await Ad.find({});
    if (!allAds.length) return next({ status: 404, message: 'Could not find any ads data.' });
    return res.json(allAds);
  } catch {
    return next({ status: 500, message: 'Internal server error.' });
  }
};

export default getAll;
