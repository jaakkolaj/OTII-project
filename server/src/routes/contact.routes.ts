// routes/contact.routes.ts
import { Router, Request, Response } from 'express';
import { Resend } from 'resend';

const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'RankWise AI <onboarding@resend.dev>', // Vaihda omaan domainiin myöhemmin
      to: ['laitinen.luukas@gmail.com'],
      subject: `Uusi viesti: ${name}`,
      replyTo: email,
      html: `
        <h3>Uusi yhteydenotto</h3>
        <p><strong>Nimi:</strong> ${name}</p>
        <p><strong>Sähköposti:</strong> ${email}</p>
        <p><strong>Viesti:</strong> ${message}</p>
      `,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: 'Sähköpostin lähetys epäonnistui' });
  }
});

export default router;