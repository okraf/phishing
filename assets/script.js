'use strict';

/* ================================================
   CHECKLIST
   ================================================ */
function initChecklist() {
  const items = document.querySelectorAll('.checklist-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      const checked = item.classList.contains('checked');
      item.setAttribute('aria-checked', checked);
    });
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
}

/* ================================================
   QUIZ
   ================================================ */
const QUESTIONS = [
  {
    id: 1,
    badge: 'IT / Sécurité',
    from: 'it-support@entreprise-corp.net',
    fromSuspicious: true,
    to: 'vous@votre-entreprise.fr',
    subject: '⚠️ Votre compte Microsoft expire dans 24h — Action requise',
    body: `Bonjour,<br><br>
Notre système a détecté que votre compte <strong>expire dans les prochaines 24 heures</strong>. Sans action de votre part, vous perdrez l'accès à votre messagerie et vos documents.<br><br>
Cliquez sur le lien ci-dessous pour vérifier votre identité et renouveler votre accès :<br><br>
<a href="#">https://microsoft-account-verify.entreprise-corp.net/renew</a><br><br>
Cordialement,<br>
L'équipe IT`,
    answer: 'phishing',
    explanation: '<strong>Phishing.</strong> Trois signaux critiques : (1) le domaine expéditeur <em>entreprise-corp.net</em> n\'est pas le domaine officiel de l\'entreprise, (2) Microsoft et les équipes IT ne demandent jamais une vérification via un lien externe, (3) l\'urgence artificielle ("24h") est un levier de manipulation classique.',
    choices: [
      { label: 'Phishing', value: 'phishing', icon: '🎣' },
      { label: 'Légitime', value: 'legit', icon: '✅' }
    ]
  },
  {
    id: 2,
    badge: 'Livraison / e-commerce',
    from: 'notification@chronopost-suivi.eu',
    fromSuspicious: true,
    to: 'vous@votre-entreprise.fr',
    subject: 'Votre colis est en attente — Frais de douane 1,99€',
    body: `Bonjour,<br><br>
Votre colis <strong>#FR-28847710</strong> est retenu en attente de paiement de frais de douane.<br><br>
Montant dû : <strong>1,99 €</strong><br>
Date limite : aujourd'hui avant 23h59<br><br>
Réglez maintenant pour débloquer votre livraison :<br>
<a href="#">https://chronopost-suivi.eu/payer?ref=FR-28847710</a><br><br>
Passé ce délai, le colis sera retourné à l'expéditeur.<br><br>
Service client Chronopost`,
    answer: 'phishing',
    explanation: '<strong>Phishing.</strong> Le vrai domaine de Chronopost est <em>chronopost.fr</em>, non <em>chronopost-suivi.eu</em>. Cette technique de "smishing adapté au mail" exploite l\'anxiété liée à un colis attendu pour obtenir des données bancaires. Le montant dérisoire (1,99€) est volontairement bas pour lever les résistances.',
    choices: [
      { label: 'Phishing', value: 'phishing', icon: '🎣' },
      { label: 'Légitime', value: 'legit', icon: '✅' }
    ]
  },
  {
    id: 3,
    badge: 'RH interne',
    from: 'rh@votre-entreprise.fr',
    fromSuspicious: false,
    to: 'vous@votre-entreprise.fr',
    subject: 'Récapitulatif de vos congés payés — Solde au 31/03/2025',
    body: `Bonjour,<br><br>
Vous trouverez ci-dessous un récapitulatif de votre solde de congés payés au 31 mars 2025.<br><br>
<strong>Congés acquis :</strong> 25 jours<br>
<strong>Congés pris :</strong> 12 jours<br>
<strong>Solde disponible :</strong> 13 jours<br><br>
Pour toute question, contactez directement le service RH par téléphone ou en passant dans nos locaux.<br><br>
Bonne journée,<br>
Marie Dupont — Responsable RH`,
    answer: 'legit',
    explanation: '<strong>Légitime.</strong> Tous les signaux sont au vert : le domaine expéditeur est le même que le vôtre, aucun lien cliquable n\'est demandé, aucune action urgente, aucune collecte d\'identifiants. Un email RH informatif sans CTA suspect est généralement sûr.',
    choices: [
      { label: 'Phishing', value: 'phishing', icon: '🎣' },
      { label: 'Légitime', value: 'legit', icon: '✅' }
    ]
  },
  {
    id: 4,
    badge: 'Bancaire',
    from: 'securite@credit-agricol.fr',
    fromSuspicious: true,
    to: 'vous@votre-entreprise.fr',
    subject: 'Activité inhabituelle détectée — Vérification requise',
    body: `Madame, Monsieur,<br><br>
Notre système de surveillance a détecté une <strong>connexion inhabituelle</strong> sur votre espace client depuis une localisation inconnue.<br><br>
Pour sécuriser votre compte, veuillez confirmer votre identité dans les 2 heures :<br><br>
<a href="#">https://credit-agricol.fr/espace-client/verification</a><br><br>
Sans action de votre part, votre accès sera <strong>temporairement suspendu</strong> à titre préventif.<br><br>
Le service sécurité du Crédit Agricole`,
    answer: 'phishing',
    explanation: '<strong>Phishing par typosquatting.</strong> Le domaine <em>credit-agricol.fr</em> est une contrefaçon de <em>credit-agricole.fr</em> (un "e" en moins). Cette technique — appelée typosquatting — est extrêmement courante. La menace de suspension du compte en 2h est un déclencheur d\'anxiété classique pour forcer une action irréfléchie.',
    choices: [
      { label: 'Phishing', value: 'phishing', icon: '🎣' },
      { label: 'Légitime', value: 'legit', icon: '✅' }
    ]
  },
  {
    id: 5,
    badge: 'Arnaque au président',
    from: 'p.martin@votre-entreprise.co',
    fromSuspicious: true,
    to: 'comptabilite@votre-entreprise.fr',
    subject: 'Mission confidentielle — Traitement urgent',
    body: `Bonjour,<br><br>
Je suis actuellement en déplacement pour une acquisition stratégique confidentielle. Je ne peux pas être joignable par téléphone pour le moment.<br><br>
J'ai besoin que vous procédiez à un <strong>virement de 23 400 €</strong> sur le compte suivant avant 16h aujourd'hui. Il s'agit d'une opération sensible, merci de ne pas en parler à vos collègues pour l'instant.<br><br>
IBAN : FR76 3000 6000 0112 3456 7890 189<br>
Référence : <em>PROJ-CONFID-2025</em><br><br>
Je compte sur vous.<br>
Pierre Martin — PDG`,
    answer: 'phishing',
    explanation: '<strong>Arnaque au président (whaling).</strong> Quatre red flags : (1) domaine <em>.co</em> au lieu de <em>.fr</em>, (2) demande de confidentialité pour isoler la cible, (3) indisponibilité téléphonique pour empêcher la vérification, (4) urgence temporelle. La règle absolue : toute demande de virement inhabituelle doit être vérifiée par appel téléphonique sur un numéro connu.',
    choices: [
      { label: 'Phishing', value: 'phishing', icon: '🎣' },
      { label: 'Légitime', value: 'legit', icon: '✅' }
    ]
  }
];

let currentQ = 0;
let score = 0;
let answered = false;

function buildEmail(q) {
  return `
    <div class="quiz-email">
      <div class="email-badge">${q.badge}</div>
      <div class="quiz-email-header">
        <span class="field-label">De</span>
        <span class="field-value ${q.fromSuspicious ? 'field-suspicious' : ''}">${q.from}</span>
        <span class="field-label">À</span>
        <span class="field-value">${q.to}</span>
        <span class="field-label">Objet</span>
        <span class="field-value">${q.subject}</span>
      </div>
      <div class="quiz-email-body">${q.body}</div>
    </div>
  `;
}

function buildQuestion(q) {
  return `
    <div class="quiz-actions">
      <div class="quiz-question">Ce message est-il du phishing ?</div>
      <div class="quiz-choices">
        ${q.choices.map(c => `
          <button class="quiz-choice" data-value="${c.value}" aria-label="${c.label}">
            <span class="choice-icon">${c.icon}</span>
            <span>${c.label}</span>
          </button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="qfeedback" role="alert"></div>
      <div class="quiz-nav" id="quiznav" style="display:none">
        <button class="btn btn-primary" id="nextbtn">
          ${currentQ < QUESTIONS.length - 1 ? 'Question suivante →' : 'Voir les résultats →'}
        </button>
      </div>
    </div>
  `;
}

function buildResults() {
  const pct = Math.round((score / QUESTIONS.length) * 100);
  let msg, sub;
  if (pct === 100) {
    msg = 'Excellent — niveau expert';
    sub = 'Vous identifiez les attaques avec précision. Partagez ces connaissances à votre équipe — c\'est votre meilleure ligne de défense.';
  } else if (pct >= 60) {
    msg = 'Bonne vigilance, quelques angles morts';
    sub = 'Vous avez les bons réflexes de base. Les attaques avancées (typosquatting, arnaque au président) méritent un entraînement supplémentaire.';
  } else {
    msg = 'Attention — profil vulnérable';
    sub = 'Les attaquants exploitent exactement ces angles morts. Une formation structurée réduirait significativement votre exposition au risque.';
  }
  return `
    <div class="quiz-results">
      <div class="quiz-score">${score}/${QUESTIONS.length}</div>
      <h3>${msg}</h3>
      <p>${sub}</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-outline" id="retrybtn">Recommencer</button>
        <a class="btn btn-primary" href="https://perceval.sh" target="_blank" rel="noopener">
          Former mon équipe →
        </a>
      </div>
    </div>
  `;
}

function updateProgress() {
  const dots = document.querySelectorAll('.progress-dot');
  dots.forEach((d, i) => {
    d.classList.remove('active', 'done');
    if (i < currentQ) d.classList.add('done');
    else if (i === currentQ) d.classList.add('active');
  });
}

function renderQuestion() {
  answered = false;
  const q = QUESTIONS[currentQ];
  const card = document.getElementById('quiz-card');
  card.innerHTML = buildEmail(q) + buildQuestion(q);
  updateProgress();

  card.querySelectorAll('.quiz-choice').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(btn.dataset.value));
  });
}

function handleAnswer(value) {
  if (answered) return;
  answered = true;

  const q = QUESTIONS[currentQ];
  const correct = value === q.answer;
  if (correct) score++;

  const choices = document.querySelectorAll('.quiz-choice');
  choices.forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.value === q.answer) btn.classList.add('correct');
    else if (btn.dataset.value === value && !correct) btn.classList.add('wrong');
  });

  const fb = document.getElementById('qfeedback');
  fb.innerHTML = q.explanation;
  fb.className = `quiz-feedback show ${correct ? 'feedback-correct' : 'feedback-wrong'}`;

  const nav = document.getElementById('quiznav');
  nav.style.display = 'flex';

  document.getElementById('nextbtn').addEventListener('click', () => {
    currentQ++;
    if (currentQ >= QUESTIONS.length) {
      showResults();
    } else {
      renderQuestion();
    }
  });
}

function showResults() {
  document.getElementById('quiz-card').innerHTML = buildResults();
  document.querySelectorAll('.progress-dot').forEach(d => d.classList.remove('active', 'done'));
  document.querySelectorAll('.progress-dot').forEach(d => d.classList.add('done'));

  document.getElementById('retrybtn')?.addEventListener('click', () => {
    currentQ = 0;
    score = 0;
    renderQuestion();
  });
}

function initQuiz() {
  renderQuestion();
}

/* ================================================
   SCROLL REVEAL
   ================================================ */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach(el => obs.observe(el));
}

/* ================================================
   BOOT
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initChecklist();
  initQuiz();
  initReveal();
});
