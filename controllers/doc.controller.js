import { Doc } from '#root/models/index.js';
import { clearImage } from '#root/utils/index.js';
import { RES_ERRORS } from '#root/common/constants.js';

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

    res.status(201).json({
      doc: savedDoc,
    });
  } catch (err) {
    console.log('ERROR [createDoc]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
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
    console.log('ERROR [getMyDocs]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const editDoc = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const docId = req.params.id;

    const { title, docUrl, type, size, filename } = req.body;

    let documentUrl;

    if (req.file) {
      documentUrl = req.file.path.replace('\\', '/');
    } else {
      documentUrl = docUrl;
    }

    const doc = await Doc.findById(docId);

    if (currentUserId !== doc.owner._id.toString()) {
      return res.status(403).json({
        message: RES_ERRORS.forbidden,
      });
    }

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
    console.log('ERROR [editDoc]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const removeDoc = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const docId = req.params.id;

    const doc = await Doc.findById(docId);

    if (currentUserId !== doc.owner._id.toString()) {
      return res.status(403).json({
        message: RES_ERRORS.forbidden,
      });
    }

    if (doc.filename && doc.size) {
      clearImage(doc.url);
    }

    await Doc.findByIdAndDelete(docId);

    res.status(201).json({ _id: docId });
  } catch (err) {
    console.log('ERROR [removeDoc]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};
