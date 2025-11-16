import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../config/prisma';
import { AppError } from '../middlewares/errorHandler';

export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { 
      status, 
      category, 
      tag, 
      search, 
      page = 1, 
      limit = 10 
    } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};

    if (status) {
      where.status = status;
    } else {
      where.isPublished = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: String(search) } },
        { excerpt: { contains: String(search) } },
        { content: { contains: String(search) } }
      ];
    }

    if (category) {
      where.categories = {
        some: {
          slug: String(category)
        }
      };
    }

    if (tag) {
      where.tags = {
        some: {
          slug: String(tag)
        }
      };
    }

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true
            }
          },
          categories: true,
          tags: true,
          _count: {
            select: { comments: true }
          }
        },
        orderBy: { publishedAt: 'desc' }
      }),
      prisma.blog.count({ where })
    ]);

    res.json({
      success: true,
      data: blogs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        categories: true,
        tags: true,
        comments: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        categories: true,
        tags: true,
        comments: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = (req as any).user.id;
    const blogData = req.body;

    const blog = await prisma.blog.create({
      data: {
        ...blogData,
        authorId: userId
      }
    });

    res.status(201).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const blog = await prisma.blog.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await prisma.blog.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const publishBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        isPublished: true,
        status: 'PUBLISHED',
        publishedAt: new Date()
      }
    });

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

export const incrementViews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        views: { increment: 1 }
      }
    });

    res.json({
      success: true,
      data: { views: blog.views }
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await prisma.blogCategory.findMany({
      include: {
        _count: {
          select: { blogs: true }
        }
      }
    });

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

export const getTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags = await prisma.blogTag.findMany({
      include: {
        _count: {
          select: { blogs: true }
        }
      }
    });

    res.json({
      success: true,
      data: tags
    });
  } catch (error) {
    next(error);
  }
};