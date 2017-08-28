import Fetch from './Fetch';
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

var name = 'Steve Lacey'
var email = 'steve@stevelacey.net'
var job = 'Software Engineer'
var blog = 'https://blog.steve.ly'
var github = 'https://github.com/stevelacey'
var google = 'https://plus.google.com/+SteveLacey34'
var instagram = 'https://www.instagram.com/stevelacey/'
var nomadlist = 'https://nomadlist.com/stevelacey'
var pinboard = 'https://pinboard.in/u:stevelacey'
var stackoverflow = 'http://stackoverflow.com/users/160821/steve'
var twitter = 'http://www.twitter.com/stevelacey'
var pgpKey = '/key.asc'


var months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
]

const App = () => (
  <Router>
    <div>
      <Nav/>

      <Route exact path="/" component={Home}/>
      <Route path="/articles" component={Articles}/>
      <Route path="/projects" component={Projects}/>
      <Route path="/references" component={References}/>
      <Route path="/topics" component={Topics}/>

      <Photo/>
    </div>
  </Router>
)

const Nav = () => (
  <ul className="list list--inline list--nav">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/articles">Articles</Link></li>
    <li><Link to="/projects">Projects</Link></li>
    <li><Link to="/references">References</Link></li>
    <li><Link to="/topics">Topics</Link></li>
  </ul>
)

const Page = ({ children }) => (
  <main className="page overlayable">
    <Header heading={<h2><Title/></h2>}/>
    {children}
    <Footer/>
  </main>
)

const HomePage = ({ children }) => (
  <main className="page overlayable">
    <Header heading={<h1><Title/></h1>}/>
    {children}
    <Footer/>
  </main>
)

const Title = () => (
  <span>
    {name} <small>{job}</small>
    <img src="https://gravatar.com/avatar/d31e3ba459fef7d0d5994291c3ef8b69?size=144" alt="{name}" title="{name}"/>
  </span>
)

const Photo = () => (
  <div className="photo overlayable">&nbsp;</div>
)

const Header = ({ heading }) => (
  <header>
    {heading}
  </header>
)

const Footer = () => (
  <footer>
  </footer>
)

const Home = () => (
  <HomePage>
    <p>
      Hey I’m Steve, a Software Engineer and vagabond,
      specialising in Python, PHP &amp; Ruby.
    </p>
    <p>
      I work remotely with teams to build appropriate, elegant and
      reliable solutions to complex problems. I help global companies,
      organizations and start-ups reach business goals with technology,
      on-budget, on-time. I am from the UK and currently working remotely in
      {' '}
      <a href="https://nomadlist.com/stevelacey" rel="nofollow">
        <Fetch url="users/stevelacey">
          {(user) => user.location ? <span>{user.location}</span> : <span>..</span>}
        </Fetch>
      </a>.
    </p>
    <p>
      I also <a href={blog}>write blog posts</a> and maintain a few <a href={github} rel="nofollow">projects on GitHub</a>.
      {' If you’re interested in hiring me '}
      <a href="/resume" rel="author">check out my resume</a>
      {' and '}
      <a href={`mailto:${email}`} className="email">drop me a line</a>,
      I am currently looking for remote contracts/roles.
    </p>
    <ul className="list list--inline list--social">
      <li>
        <a href={twitter} title="Twitter: stevelacey" rel="me nofollow">
          <Icon name='twitter'/>
        </a>
      </li>
      <li>
        <a href={github} title="GitHub: stevelacey" rel="me nofollow">
          <Icon name='github'/>
        </a>
      </li>
      <li>
        <a href={stackoverflow} title="Stack Overflow" rel="me nofollow">
          <Icon name='stack-overflow'/>
        </a>
      </li>
      <li>
        <a href={instagram} title="Instagram: stevelacey" rel="me nofollow">
          <Icon name='instagram'/>
        </a>
      </li>
      <li>
        <a href={pinboard} title="Pinboard" rel="me nofollow">
          <Icon name='thumb-tack'/>
        </a>
      </li>
      <li className="sr-only">
        <a href={google} title="Google+" rel="me nofollow">
          <Icon name='google-plus'/>
        </a>
      </li>
      <li>
        <a href={pgpKey} title="PGP key" rel="me">
          <Icon name='key'/>
        </a>
      </li>
      <li>
        <a href={nomadlist} title="Travel itinerary" rel="me nofollow">
          <Icon name='location-arrow'/>
        </a>
      </li>
    </ul>
    <RecentProjects/>
    <Skills/>
  </HomePage>
)

const Articles = () => (
  <Page>
    <h1>Articles</h1>
    <Fetch url="articles">
      {(articles) => articles.length ?
      <ul className="list">
        {articles.map(article =>
         <li key={article.title}>
           <Article article={article}/>
         </li>
        )}
      </ul>
      :
      <Loading/>}
    </Fetch>
  </Page>
)

const Article = ({ article }) => (
  <h3>
    <a href={article.links[0].href}>
      {article.title} <small>{months[article.published_parsed[1]-1]} {article.published_parsed[0]}</small>
      <img src={`${article.media_content[0].url}?fit=crop&w=64&h=64`} alt="{article.title}"/>
    </a>
  </h3>
)

const Projects = () => (
  <Page>
    <h1>Projects</h1>
    <Fetch url="projects">
      {(projects) => projects.length ?
      <ul style={{ padding: 0 }}>
        {projects.map(project =>
         <li key={project.title} style={{ listStyle: 'none' }}>
           <Project project={project}/>
         </li>
        )}
      </ul>
      :
      <Loading/>}
    </Fetch>
  </Page>
)

const Project = ({ project }) => (
  <div>
    <h2><a href={project.uri}>{project.title}</a></h2>
    <img src={project.image.url} alt={project.image.caption || project.image.title} width="200"/>
    <p dangerouslySetInnerHTML={{__html: project.description}}/>
  </div>
)

const References = () => (
  <Page>
    <h1>References</h1>
    <Fetch url="quotes">
      {(references) => references.length ?
      <ul style={{ padding: 0 }}>
        {references.map(reference =>
         <li key={reference.name} style={{ listStyle: 'none' }}>
           <Reference reference={reference}/>
         </li>
        )}
      </ul>
      :
      <Loading/>}
    </Fetch>
  </Page>
)

const Reference = ({ reference }) => (
  <div>
    <h2>
      <a href={reference.uri}>
        {reference.name}
        <div><small>{reference.job}</small></div>
      </a>
    </h2>
    <p>{reference.text}</p>
  </div>
)

const Skills = () => (
  <section id="skills">
    <h2>Skills</h2>
    <Fetch url="skills?set=building-cool-things-in">
      {(skills) => skills.length ?
      <ul className="list list--inline list--skills">
        {skills.map(skill =>
         <li key={skill.slug}>
           <Skill skill={skill}/>
         </li>
        )}
      </ul>
      :
      <Loading/>}
    </Fetch>
  </section>
)

const Skill = ({ skill }) => (
  <a href={skill.url} title={skill.name}>
    <img alt={skill.name} class="icon" src={`${skill.image.url}?w=64&h=64`}/>
    <span className="sr-only">{skill.name}</span>
  </a>
)

const RecentProjects = () => (
  <section id="projects">
    <h2>Recent projects</h2>
    <Fetch url="summary">
      {(projects) => projects.length ?
      <ul className="list list--inline list--projects">
        {projects.map(project =>
         <li id={project.slug} key={project.slug} class="item item--project" data-scope={project.slug}>
           <RecentProject project={project}/>
         </li>
        )}
      </ul>
      :
      <Loading/>}
    </Fetch>
  </section>
)

const RecentProject = ({ project }) => (
    <div>
      <h3>
          <a href={project.url} rel="nofollow">
              {project.name}
              {' '}
              <small dangerouslySetInnerHTML={{__html: project.description}}/>
              <img src={`${project.image}?fit=clamp&amp;w=160&amp;h=160`} alt={project.name} width="32" height="32"/>
          </a>
      </h3>
      <div dangerouslySetInnerHTML={{__html: project.content}}/>
    </div>
)

const Topics = ({ match }) => (
  <Page>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </Page>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
    <Fetch url="https://jsonplaceholder.typicode.com/posts">
      {(posts) => posts.length ? <Posts posts={posts}/> : <Loading/>}
    </Fetch>
  </div>
)

const Posts = ({ posts }) => (
  <ul>
    {posts.map(post =>
     <li key={post.id}>
       <h2>{post.title}</h2>
       <p>{post.body}</p>
     </li>
    )}
  </ul>
)

const Icon = ({ name }) => (
  <FontAwesome name={name} className='icon'/>
)

const Loading = () => (
  <p>Loading...</p>
)

export default App
