import React, { FC, Fragment } from "react";
import { Layout } from "./layout";
import { Header } from "./header";
import { Content } from "./content";
import { Footer } from "./footer";
import "./layout-example.scss";
import { Aside } from "./aside";
const LayoutExample: FC = function () {
  return (
    <Fragment>
      <div className="layout-example">
        <article>
          <h2>example 1</h2>
          <section>
            <Layout className="example-layout example-layout-1">
              <Header className='header'>header</Header>
              <Content className='content'>content</Content>
              <Footer className='footer'>footer</Footer>
            </Layout>
          </section>
        </article>
        <article>
          <h2>example 2</h2>
          <section>
            <Layout className="example-layout example-layout-2">
              <Header className='header'>header</Header>
              <Layout>
                <Aside className='aside'>aside</Aside>
                <Content className='content'>content</Content>
              </Layout>
              <Footer className='footer'>footer</Footer>
            </Layout>
          </section>
        </article>
      </div>
    </Fragment>
  );
};
export default LayoutExample;
