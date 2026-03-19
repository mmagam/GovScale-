# Product Requirements Document
## GovScale: Exponential Maturity Assessment Platform

## 1. Executive Summary
GovScale is a self-serve web application that enables government entities to assess their organizational maturity across strategic, operational, digital, and innovation capabilities. Users complete a structured 34-question assessment using a 5-point Likert scale, and the platform calculates weighted pillar scores, an overall maturity score out of 5.0, a maturity stage classification, and a visual Radar/Spider Chart scorecard.

The MVP is designed for fast adoption, low training overhead, and immediate value. It will provide government leaders with a clear, standardized view of current maturity, highlight capability gaps, and support strategic planning, transformation prioritization, and executive reporting.

The product must be self-service, intuitive, and fast enough for a department head or strategy leader to complete in a single sitting and export as a PDF for formal review or presentation.

## 2. Product Objective
Build a web-based maturity assessment platform that:
- Captures user identity and department context
- Guides users through a paginated 34-question assessment
- Calculates weighted maturity scores automatically
- Displays results instantly in a dashboard with a dynamic Radar/Spider Chart
- Exports the final scorecard as a PDF

## 3. Success Criteria
The MVP will be considered successful if it:
- Enables users to complete the assessment without facilitation
- Produces a mathematically accurate weighted maturity score
- Clearly visualizes pillar-level performance in a Radar/Spider Chart
- Provides a downloadable PDF suitable for leadership review
- Achieves high completion and low abandonment rates

## 4. Target Personas
### Primary Persona 1: Government Department Head
- Senior decision-maker responsible for departmental performance and transformation
- Needs a fast, credible view of organizational maturity
- Values concise outputs, benchmarking readiness, and presentation-friendly reporting

### Primary Persona 2: Strategy Director
- Owns strategic planning, transformation roadmaps, and alignment to national priorities
- Needs structured diagnostics to identify gaps and prioritize investments
- Values traceable scoring logic and clear pillar-level analysis

### Primary Persona 3: Innovation Lead
- Drives digital innovation, experimentation, and future-readiness programs
- Needs a way to assess digital maturity and organizational readiness
- Values actionable insights and visual outputs to support change initiatives

## 5. User Journey
1. User lands on the GovScale homepage.
2. User reviews a brief explanation of the assessment purpose and expected duration.
3. User enters intake details:
   - Name
   - Department
4. User starts the assessment.
5. User progresses through a paginated questionnaire containing 34 Likert-scale questions.
6. User selects one answer per question on a scale of 1 to 5.
7. User submits the completed assessment.
8. System validates completion of all required questions.
9. Scoring engine calculates:
   - average score per pillar
   - weighted pillar score
   - total score out of 5.0
   - maturity stage
10. Results dashboard renders instantly with:
   - total score
   - maturity stage
   - pillar scores
   - dynamic Radar/Spider Chart
11. User exports the final scorecard as a PDF.

## 6. Functional Requirements
## 6.1 User Intake
### User Story
As a government user, I want to enter my name and department before starting the assessment so that my scorecard is contextualized and identifiable.

### Requirements
- The landing page must include a clear call to action to begin the assessment.
- The platform must capture:
  - Name
  - Department
- Both fields must be required before the user can proceed.
- The system must persist intake data through the assessment session.

## 6.2 Assessment Questionnaire
### User Story
As a user, I want to complete the assessment in a paginated format so that the experience feels manageable and easy to follow.

### Requirements
- The platform must present 34 questions across multiple paginated screens.
- Each question must use a 5-point Likert scale:
  - 1 = Strongly Disagree
  - 2 = Disagree
  - 3 = Neutral
  - 4 = Agree
  - 5 = Strongly Agree
- Each question must require exactly one response.
- Users must be able to navigate forward and backward between pages without losing answers.
- The UI must show progress through the assessment.
- The submit action must only be enabled when all 34 questions are answered.

## 6.3 Scoring Engine
### User Story
As a user, I want my responses converted into an objective weighted maturity score so that I can understand my department’s current maturity level.

### Requirements
- The scoring engine must calculate the average score for each pillar.
- The engine must apply the predefined pillar weight to each pillar average.
- The engine must sum the weighted pillar scores into a final total score out of 5.0.
- The engine must map the final score to a maturity stage.
- The scoring logic must be deterministic and consistent for identical inputs.
- The platform must store question-to-pillar mapping in a maintainable configuration structure.

## 6.4 Results Dashboard
### User Story
As a user, I want to instantly view my results in a clear dashboard so that I can understand strengths and gaps at a glance.

### Requirements
- Upon submission, the system must render a results dashboard immediately.
- The dashboard must display:
  - User name
  - Department
  - Overall score out of 5.0
  - Maturity stage
  - Pillar-level scores
  - Radar/Spider Chart
- The chart must plot all seven pillars.
- The dashboard must visually distinguish stronger vs. weaker pillars.

## 6.5 PDF Export
### User Story
As a user, I want to export the results as a PDF so that I can share the scorecard with leadership and stakeholders.

### Requirements
- The results page must include an `Export PDF` action.
- The exported PDF must include:
  - GovScale title
  - User name
  - Department
  - Assessment date
  - Overall score
  - Maturity stage
  - Pillar scores
  - Radar/Spider Chart
- The PDF must be formatted for A4 portrait or landscape consistently.
- Export should complete in a reasonable time without requiring page reload.

## 7. Non-Functional Requirements
### Performance
- Landing page should load in under 2 seconds on a standard broadband connection.
- Assessment page transitions should feel immediate.
- Results should render in under 2 seconds after submission.
- PDF export should complete in under 5 seconds for standard usage.

### Reliability
- Responses must not be lost during page-to-page navigation.
- The system must handle browser refresh gracefully if session persistence is implemented.
- Score calculation must be accurate and repeatable.

### Security
- All traffic must be encrypted via HTTPS.
- User input must be validated server-side.
- No sensitive data beyond name and department should be collected in MVP.
- PDF exports must only contain the current user’s submitted data.

### Usability
- The application must be responsive on desktop and tablet at minimum.
- The assessment must be readable, accessible, and low-friction for senior government users.
- Labels, scale meanings, and navigation must be explicit and unambiguous.

### Accessibility
- The interface should support keyboard navigation.
- Forms and charts must include accessible labels and semantic structure.
- Color usage must maintain sufficient contrast.

### Maintainability
- Questions, weights, dimensions, and maturity thresholds must be configurable in code.
- The scoring engine must be modular and unit-testable.
- Chart rendering logic must be separated from scoring logic.

## 8. Data & Scoring Logic
## 8.1 Response Scale
All questions use the following Likert scale:
- 1 = Strongly Disagree
- 2 = Disagree
- 3 = Neutral
- 4 = Agree
- 5 = Strongly Agree

## 8.2 Pillars and Weights
- Pillar 1: Purpose & Alignment = 15%
- Pillar 2: Agility & Scaling = 25%
- Pillar 3: Internal Ops & Innovation = 25%
- Pillar 4: National Alignment = 15%
- Pillar 5: Data Ecosystem = 10%
- Pillar 6: Digital Platform = 5%
- Pillar 7: Future Foresight = 5%

Total weight = 100%

## 8.3 Scoring Formula
For each pillar:
1. Sum all question responses in the pillar
2. Divide by the number of questions in the pillar to get the pillar average
3. Multiply the pillar average by the pillar weight

Final score:
- Final Score = Sum of all weighted pillar scores

Engineering note:
- Weights should be implemented as decimal multipliers:
  - 0.15
  - 0.25
  - 0.25
  - 0.15
  - 0.10
  - 0.05
  - 0.05

Because the total weight equals 1.0, the final result remains on a 1.0 to 5.0 scale.

Example:
- Pillar Average = 4.2
- Weight = 0.15
- Weighted Contribution = 0.63

## 8.4 Maturity Stage Mapping
- 1.0 - 2.0: Traditional
- 2.1 - 3.0: Emerging
- 3.1 - 4.0: Advanced
- 4.1 - 5.0: Exponential

Engineering note:
- Define exact boundary logic to avoid ambiguity.
- Recommended implementation:
  - `score <= 2.0` -> Traditional
  - `score <= 3.0` -> Emerging
  - `score <= 4.0` -> Advanced
  - `score <= 5.0` -> Exponential

## 8.5 Radar/Spider Chart Logic
- The Radar/Spider Chart must plot one axis per pillar, for a total of seven axes.
- Each axis value must represent the raw average pillar score, not the weighted contribution.
- Axis scale must be fixed from 1 to 5 for consistency across all users.
- Tooltip or labels should display:
  - Pillar name
  - Pillar average
  - Pillar weight

Engineering note:
- Use pillar averages for visualization because they are more interpretable than weighted contributions.
- Use weighted values only for final score calculation.

## 8.6 Assessment Data Model
Recommended entities:
- `AssessmentSession`
  - id
  - name
  - department
  - startedAt
  - completedAt
  - finalScore
  - maturityStage
- `AssessmentResponse`
  - sessionId
  - questionId
  - pillarId
  - dimensionId
  - responseValue
- `PillarScore`
  - sessionId
  - pillarId
  - pillarAverage
  - pillarWeight
  - weightedScore

## 8.7 Hardcoded Assessment Structure and Questions
The following questions must be implemented verbatim.

### Pillar 1: Purpose & Alignment (15% Weight)
#### Dimension 1: MTP
1.1. Clear Ambition: Our organization has a highly ambitious, clearly written purpose that goes beyond basic service delivery to inspire significant, positive change for the public.  
1.2. Shared Understanding: Every team member, partner, and key stakeholder can easily explain our core purpose and why it matters.  
1.3. Daily Alignment: We use formal systems (like performance goals or project management tools) to ensure every daily task and strategic decision directly supports our core purpose.  
1.4. External Inspiration: Our core purpose is communicated so powerfully that it actively attracts top talent, partners, and public engagement to our organization.

### Pillar 2: Agility & Scaling (25% Weight)
#### Dimension 2: Staff on Demand
2.1. Flexible Talent Sourcing: We easily and instantly access a global pool of specialized external talent (like freelancers or experts) to form dynamic project teams, rather than relying only on full-time staff.  
2.2. Automated Talent Management: We use smart, automated systems to instantly identify skill gaps, find the right people (internal or external), and handle their contracts and payments.

#### Dimension 3: Community & Crowd
2.3. Active Community Collaboration: We have built a self-sustaining community of citizens and partners who actively help us co-create services, provide support, and improve our offerings.  
2.4. Utilizing Public Input (Crowdsourcing): We continuously and automatically gather input from the public (crowdsourcing) to improve our data accuracy and identify gaps in our services.

#### Dimension 4: Algorithms & AI
2.5. Personalized Services: We use data and smart algorithms to provide a highly personalized, proactive experience for every citizen, anticipating what they need based on their specific life events.  
2.6. Intelligent Automation: Our core daily operations run on autonomous, smart systems that manage processes, allocate resources, and fix issues with very little human intervention.

#### Dimension 5: Leveraged Assets
2.7. Asset Ownership Strategy: Rather than building and owning everything ourselves (like servers or physical infrastructure), we prioritize partnering with external platforms to access the best available technology.  
2.8. Open Data Connections (APIs): We provide secure, open connections (APIs) that allow external developers and partners to easily build new services on top of our existing data and platforms.

#### Dimension 6: Engagement Mechanics
2.9. Organic Public Engagement: Our digital services are so valuable and easy to use that citizens naturally engage with them and encourage others to do so, without us needing to spend heavily on marketing.  
2.10. Data-Driven Improvements: We continuously track how citizens use our services in real-time and use that data to automatically optimize their experience.

### Pillar 3: Internal Ops & Innovation (25% Weight)
#### Dimension 7: Interfaces
3.1. Seamless Partner Integration: We provide self-service digital portals that allow external partners to connect with our systems and share information seamlessly, without requiring manual work from our staff.  
3.2. Citizen-Centric Design: Our digital interfaces are designed entirely around the citizen's journey (e.g., "starting a business" or "having a child"), completely hiding the complexity of our internal government departments.

#### Dimension 8: Dashboards
3.3. Actionable Team Data: Our teams have real-time, predictive dashboards that not only track performance but automatically alert us to risks and create tasks when metrics fall behind.  
3.4. Strategic Leadership Insights: Our leadership uses advanced, real-time dashboards that compare our performance against peer organizations and run simulations to recommend the best strategic decisions.

#### Dimension 9: Experimentation
3.5. Culture of Experimentation: We actively encourage teams to rapidly test new ideas; we view "intelligent failure" as a valuable learning opportunity that is rewarded, not punished.  
3.6. Standardized Testing: We use a standardized, automated process to test new initiatives on small groups of users before a full launch, storing all results in a central database to share learnings.

#### Dimension 10: Autonomy
3.7. Empowered Teams: Instead of rigid hierarchies, we operate as a network of highly autonomous, multi-disciplinary teams that take full ownership of specific citizen services.  
3.8. Decentralized Decision Making: Frontline teams are empowered to make operational decisions quickly without needing multiple layers of management approval, allowing leadership to focus on long-term strategy.

#### Dimension 11: Social Technologies
3.9. Modern Collaboration Tools: We use advanced digital workspaces that integrate our communication, project management, and knowledge sharing into one seamless platform.  
3.10. Transparent Communication: We practice "working out loud," where internal discussions, decisions, and knowledge are openly accessible to the entire organization by default.

### Pillar 4: National Alignment (15% Weight)
#### Dimension 12: National Strategy Alignment
4.1. Driving the National Vision: Our strategic roadmap is explicitly linked to the national economic vision, and we act as a primary driver for major national initiatives.  
4.2. Long-Term Future Planning: We maintain a dedicated focus on how our technology and services will evolve to support the country's long-term strategic plans (e.g., 50-year national visions).  
4.3. Leading in Artificial Intelligence: We are recognized as a pioneer in implementing the National Strategy for Artificial Intelligence, with a comprehensive plan covering data, talent, and ethics.  
4.4. Transparent Impact Reporting: We track our specific contributions to national performance indicators (KPIs) on a real-time, public-facing dashboard, serving as a model for other government entities.

### Pillar 5: Data Ecosystem (10% Weight)
#### Dimension 13: Data Ecosystem
5.1. Central Data Hub: We act as a central hub in the national data ecosystem, constantly sharing and receiving real-time data (like smart city sensors) to create smarter, interconnected services.  
5.2. Predictive Analytics: We use advanced analytics not just to predict future public needs, but to automatically recommend and execute the best solutions before problems occur.  
5.3. Real-Time Policy Simulation: We provide policymakers with a real-time "digital twin" (a virtual model of our operations) that allows them to test the impact of new policies safely before they are implemented.

### Pillar 6: Digital Platform (5% Weight)
#### Dimension 14: Platform Evolution
6.1. Seamless Third-Party Integration: We operate a digital marketplace where citizens can access both our government services and approved private-sector services in one seamless experience.  
6.2. Enabling External Innovation: We provide the digital tools (like SDKs) that allow external developers to easily build and launch their own innovative services within our digital ecosystem.  
6.3. Advanced Payment Infrastructure: Our digital payment system functions as a major digital wallet, allowing citizens to easily handle both government fees and private transactions.

### Pillar 7: Future Foresight (5% Weight)
#### Dimension 15: Future Foresight
7.1. Continuous Trend Spotting: We have a dedicated team and automated systems that continuously scan for emerging global trends to maintain a clear view of the future.  
7.2. Adaptive Strategy: Our strategic plans and budgets are highly flexible, continuously updating in real-time based on the new trends and future signals we identify.  
7.3. Investing in the Future: We have a dedicated budget and "innovation lab" specifically designed to build prototypes and test disruptive, next-generation technologies.

## 9. UI/UX Guidelines
### Design Principles
- Professional and institutional visual tone suitable for government users
- Minimal cognitive load
- Clear hierarchy and structured layouts
- High readability and strong contrast
- Confidence-inspiring, data-centric presentation

### Landing Page
- Short value proposition
- Brief explanation of assessment purpose
- Estimated time to complete
- Name and Department intake form
- Primary CTA: `Start Assessment`

### Questionnaire
- Paginated layout with 4 to 6 questions per page
- Sticky or visible progress indicator
- Each question displayed as a statement with 5 clearly labeled radio options
- Buttons:
  - `Back`
  - `Next`
  - `Submit Assessment`
- Prevent accidental submission before completion

### Results Dashboard
- Must include:
  - Overall score
  - Maturity stage badge
  - Radar/Spider Chart
  - Pillar score breakdown
  - Export PDF button
- Use plain language labels for each pillar
- Radar chart should be readable in both screen and PDF formats

### PDF Output
- Clean executive-report format
- Consistent branding and layout
- Suitable for printing or sharing digitally
- Must preserve chart readability and score clarity

## 10. Out of Scope
The following items are explicitly out of scope for MVP:
- User authentication and role-based access control
- Multi-user collaboration
- Historical assessment tracking across multiple sessions
- Benchmarking against peer organizations
- AI-generated recommendations or narrative analysis
- Admin panel for editing questions and weights
- Localization and multilingual support
- Integration with government HR, strategy, or analytics systems
- Custom question authoring by end users
- Advanced analytics beyond the defined weighted scoring model

## 11. Engineering Notes
### Recommended Implementation Approach
- Store assessment configuration in structured JSON or TypeScript constants:
  - pillar metadata
  - weights
  - dimension mapping
  - question text
- Implement scoring in a standalone service module
- Render chart from computed pillar averages
- Generate PDF from the results screen or a dedicated print layout

### Minimum Test Coverage
Engineering should validate:
- All 34 questions are present and mapped correctly
- Each question accepts only values 1 through 5
- Pillar averages are computed correctly
- Weighting logic is mathematically correct
- Final maturity stage mapping is correct at threshold boundaries
- Radar chart receives exactly seven pillar values
- PDF export includes all required result data
