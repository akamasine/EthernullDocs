import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ethernull",
  description: "Autonomous hive-mind security intelligence system",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'User Guide', link: '/getting-started' },
      { text: 'Reference', link: '/architecture' }
    ],

    sidebar: [
      {
        text: 'User Guide',
        items: [
          { text: '1.1 Installation & First Run', link: '/getting-started' },
          { text: '1.2 Deploying Your First Agent', link: '/deploying-agent' },
          { text: '1.3 Monitoring Your Fleet', link: '/monitoring' },
          { text: '1.4 Service Inventory & Vuln Mgmt', link: '/inventory-vuln-mgmt' },
          { text: '1.5 Talking to the Brain', link: '/talking-to-brain' },
          { text: '1.6 Security Audits', link: '/using-audits' },
          { text: '1.7 Red Phantom (AI Red Team)', link: '/using-red-phantom' },
          { text: '1.8 Threat Intel Feeds', link: '/threat-intel-feeds' },
          { text: '1.9 Escalation & Response', link: '/escalation-response' },
          { text: '1.10 Self-Healing', link: '/self-healing' },
          { text: '1.11 Risk Scores & Profiles', link: '/risk-profiles' },
          { text: '1.12 Notifications', link: '/notifications' },
          { text: '1.13 Consciousness (Auto Mode)', link: '/consciousness-mode' },
          { text: '1.14 The TUI', link: '/tui' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: '2.1 Architecture Overview', link: '/architecture' },
          { text: '2.2 Detection Engine', link: '/detection-engine' },
          { text: '2.3 Agent Internals', link: '/agent-internals' },
          { text: '2.4 Core Server & API', link: '/core-server' },
          { text: '2.5 Intelligence Layer', link: '/intelligence' },
          { text: '2.6 Service Inventory Pipeline', link: '/inventory-pipeline' },
          { text: '2.7 Red Phantom Architecture', link: '/phantom-architecture' },
          { text: '2.8 Policy Engine', link: '/policy-engine' },
          { text: '2.9 Gateway', link: '/gateway' },
          { text: '2.10 PKI & Security', link: '/pki-security' },
          { text: '2.11 Self-Diagnostics', link: '/self-diagnostics' },
          { text: '2.12 Configuration Reference', link: '/configuration' },
          { text: '2.13 API Reference', link: '/api-reference' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/akamasine/Ethernull' }
    ]
  }
})
