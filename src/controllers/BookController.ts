import { Request, Response } from 'express';
import Book from '../models/book';

export const updateBook = (req: Request, res: Response) => {
  let book = Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: any, book: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(book);
      }
    }
  );
};

export const deleteBook = (req: Request, res: Response) => {
  const book = Book.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Book deleted from database');
    }
  });
};
