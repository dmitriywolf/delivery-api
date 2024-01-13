import { Doc } from '#root/models/index.js';
import { clearImage } from '#root/utils/index.js';

export const createDoc = async (req, res) => {
  try {
    const { title, docUrl, type, size, filename } = req.body;

    let documentUrl;

    if (req.file) {
      documentUrl = req.file.path.replace('\\', '/');
    } else {
      documentUrl = docUrl;
    }

    const doc = new Doc({ title, owner: req.userId, url: documentUrl, type, size, filename });

    const savedDoc = await doc.save();

    res.status(200).json({
      doc: savedDoc,
    });
  } catch (err) {
    console.log('[createDoc]', err);
    res.status(500).json({
      message: 'Не удалось создать документ',
    });
  }
};

export const getMyDocs = async (req, res) => {
  try {
    const docs = await Doc.find({ owner: req.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      docs,
    });
  } catch (err) {
    console.log('[getMyDocs]', err);
    res.status(500).json({
      message: 'Не удалось получить мои документы',
    });
  }
};

export const editDoc = async (req, res) => {
  try {
    const { docId } = req.params;

    const { title, docUrl, type, size, filename } = req.body;

    let documentUrl;

    if (req.file) {
      documentUrl = req.file.path.replace('\\', '/');
    } else {
      documentUrl = docUrl;
    }

    const doc = await Doc.findById(docId);

    if (documentUrl !== doc.url) {
      clearImage(doc.url);
    }

    doc.title = title;
    doc.url = documentUrl;
    doc.size = size;
    doc.filename = filename;
    doc.type = type;

    const updatedDoc = await doc.save();

    res.status(200).json({ doc: updatedDoc });
  } catch (err) {
    console.log('[editDoc]', err);
    res.status(500).json({
      message: 'Не удалось отредактировать документ',
    });
  }
};

export const removeDoc = async (req, res) => {
  try {
    const { docId } = req.params;

    const doc = await Doc.findById(docId);

    if (doc.filename && doc.size) {
      clearImage(doc.url);
    }

    const result = await Doc.findByIdAndDelete(docId);

    console.log('RES delete', result);

    res.status(201).json({ _id: docId });
  } catch (err) {
    console.log('[removeDoc]', err);
    res.status(500).json({
      message: 'Не удалось удалить документ',
    });
  }
};
