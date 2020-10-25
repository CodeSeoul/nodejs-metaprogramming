'use strict';

export const getBookList = async (ctx) => {
  const countPerPage = ctx.request.query.countPerPage;
  const page = ctx.request.query.page;
  const offset = countPerPage * page;

  let results;
  try {
    results = (await ctx.db.execute(
        'select id, title from books limit :countPerPage offset :offset',
        {
          countPerPage,
          offset,
        })).results;
  } catch (e) {
    ctx.throw(e);
  }

  const links = {
    self: {
      href: '/books',
    },
    nextPage: {
      href: `/books?page=${page + 1}`,
    },
  };

  if (page > 0) {
    links.prevPage = {
      href: `/books?page=${page - 1}`,
    };
  }

  ctx.body = {
    books: results,
    _links: links,
  };
};

export const createBook = async (ctx) => {
  let results;
  try {
    results = (await ctx.db.execute(
        'insert into books (title) values (:title)',
        {
          title: ctx.request.body.title,
        },
    )).results;
  } catch (e) {
    ctx.throw(e);
  }

  ctx.body = {
    id: results.insertId,
    title: ctx.request.body.title,
    _links: {
      self: {
        href: '/books',
      },
    },
  };
};
