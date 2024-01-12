import { Doc } from '#root/models/index.js';
import { clearImage } from '#root/utils/index.js';

export const createDoc = async (req, res) => {
  try {
    const { title, docUrl } = req.body;

    let documentUrl;

    if (req.file) {
      documentUrl = req.file.path.replace('\\', '/');
    } else {
      documentUrl = docUrl;
    }

    const doc = new Doc({ title, owner: req.userId, url: documentUrl });

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
    const docs = await Doc.find({ owner: req.userId });

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

export const getDocsByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;

    const docs = await Doc.find({ owner: companyId });

    res.status(200).json({
      docs,
    });
  } catch (err) {
    console.log('[getDocsByCompanyId]', err);
    res.status(500).json({
      message: 'Не удалось получить документы компании',
    });
  }
};

export const editDoc = async (req, res) => {
  try {
    const { docId } = req.params;

    const { title, docUrl } = req.body;

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

    const result = await Doc.findByIdAndDelete(docId);

    console.log('RES delete', result);

    res.status(201).json({ message: 'Deleted' });
  } catch (err) {
    console.log('[removeDoc]', err);
    res.status(500).json({
      message: 'Не удалось удалить документ',
    });
  }
};
