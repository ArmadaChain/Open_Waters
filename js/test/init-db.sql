--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1 (Debian 12.1-1.pgdg100+1)
-- Dumped by pg_dump version 12.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: event_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_type (
    waybill_status_id bigint NOT NULL,
    event_type_code character varying(256) NOT NULL,
    event_text character varying(30) NOT NULL,
    usage integer NOT NULL,
    created_dt bigint NOT NULL,
    created_in text,
    created_by text,
    modified_dt bigint NOT NULL,
    modified_in text,
    modified_by text,
    is_delivered boolean NOT NULL,
    is_event_incident boolean NOT NULL,
    id integer NOT NULL,
    version integer
);


ALTER TABLE public.event_type OWNER TO postgres;

--
-- Name: event_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_type_id_seq OWNER TO postgres;

--
-- Name: event_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_type_id_seq OWNED BY public.event_type.id;


--
-- Name: event_type_mapping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_type_mapping (
    id integer NOT NULL,
    from_system text NOT NULL,
    origin_event_type_code character varying(256) NOT NULL,
    joshua_event_type_code character varying(256) NOT NULL,
    origin_event_text text NOT NULL,
    note text DEFAULT ''::text,
    is_default boolean NOT NULL
);


ALTER TABLE public.event_type_mapping OWNER TO postgres;

--
-- Name: event_type_mapping_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_type_mapping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_type_mapping_id_seq OWNER TO postgres;

--
-- Name: event_type_mapping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_type_mapping_id_seq OWNED BY public.event_type_mapping.id;


--
-- Name: hub; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hub (
    id integer NOT NULL,
    hub text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    country text NOT NULL,
    timezone text NOT NULL
);


ALTER TABLE public.hub OWNER TO postgres;

--
-- Name: hub_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hub_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hub_id_seq OWNER TO postgres;

--
-- Name: hub_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hub_id_seq OWNED BY public.hub.id;


--
-- Name: pp_token_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pp_token_info (
    id bigint NOT NULL,
    token_id text NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.pp_token_info OWNER TO postgres;

--
-- Name: pp_token_info_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pp_token_info_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pp_token_info_id_seq OWNER TO postgres;

--
-- Name: pp_token_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pp_token_info_id_seq OWNED BY public.pp_token_info.id;


--
-- Name: shipment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shipment (
    shipment_no character varying(256) NOT NULL,
    version integer
);


ALTER TABLE public.shipment OWNER TO postgres;

--
-- Name: table_seq_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.table_seq_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.table_seq_seq OWNER TO postgres;

--
-- Name: tracking_event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tracking_event (
    id integer NOT NULL,
    shipment_no character varying(256) NOT NULL,
    waybill_no character varying(256) NOT NULL,
    event_no character varying(256) NOT NULL,
    event_text text NOT NULL,
    datetime bigint NOT NULL,
    timezone character varying(256) NOT NULL,
    agent character varying(256) DEFAULT NULL::character varying,
    location json,
    item_num integer,
    original_event_text text,
    from_source text,
    usage integer NOT NULL,
    pod_info json,
    created_dt bigint NOT NULL,
    created_in text NOT NULL,
    created_by text NOT NULL,
    modified_dt bigint NOT NULL,
    modified_in text NOT NULL,
    modified_by text NOT NULL,
    external_visible boolean,
    event_type_no bigint NOT NULL,
    pod_additional_text_public text,
    pod_additional_text_internal text,
    version integer
);


ALTER TABLE public.tracking_event OWNER TO postgres;

--
-- Name: waybill; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.waybill (
    shipment_no character varying(256) DEFAULT NULL::character varying,
    waybill_no character varying(256) NOT NULL,
    parcel_no character varying(256) NOT NULL,
    track_no character varying(256) NOT NULL,
    agent_tracking_no character varying(256) NOT NULL,
    shipper text,
    service text,
    origin text,
    destination text,
    pieces bigint,
    consignee text,
    customer_reference text,
    status_id integer NOT NULL,
    usage integer NOT NULL,
    created_dt bigint NOT NULL,
    created_in text NOT NULL,
    created_by text NOT NULL,
    modified_dt bigint NOT NULL,
    modified_in text NOT NULL,
    modified_by text NOT NULL,
    eta_date bigint,
    external_visible boolean,
    version integer
);


ALTER TABLE public.waybill OWNER TO postgres;

--
-- Name: waybill_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.waybill_status (
    status character varying(256) NOT NULL,
    waybill_status_code character varying(256) NOT NULL,
    usage integer NOT NULL,
    created_dt bigint NOT NULL,
    created_in text NOT NULL,
    created_by text NOT NULL,
    modified_dt bigint NOT NULL,
    modified_in text NOT NULL,
    modified_by text NOT NULL,
    id integer NOT NULL,
    note text DEFAULT ''::text,
    version integer
);


ALTER TABLE public.waybill_status OWNER TO postgres;

--
-- Name: waybill_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.waybill_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.waybill_status_id_seq OWNER TO postgres;

--
-- Name: waybill_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.waybill_status_id_seq OWNED BY public.waybill_status.id;


--
-- Name: word_conversion_rule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.word_conversion_rule (
    id integer NOT NULL,
    from_text text NOT NULL,
    to_text text NOT NULL,
    is_regex boolean NOT NULL,
    is_actived boolean NOT NULL
);


ALTER TABLE public.word_conversion_rule OWNER TO postgres;

--
-- Name: word_conversion_rule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.word_conversion_rule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.word_conversion_rule_id_seq OWNER TO postgres;

--
-- Name: word_conversion_rule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.word_conversion_rule_id_seq OWNED BY public.word_conversion_rule.id;


--
-- Name: event_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_type ALTER COLUMN id SET DEFAULT nextval('public.event_type_id_seq'::regclass);


--
-- Name: event_type_mapping id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_type_mapping ALTER COLUMN id SET DEFAULT nextval('public.event_type_mapping_id_seq'::regclass);


--
-- Name: hub id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hub ALTER COLUMN id SET DEFAULT nextval('public.hub_id_seq'::regclass);


--
-- Name: pp_token_info id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pp_token_info ALTER COLUMN id SET DEFAULT nextval('public.pp_token_info_id_seq'::regclass);


--
-- Name: waybill_status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waybill_status ALTER COLUMN id SET DEFAULT nextval('public.waybill_status_id_seq'::regclass);


--
-- Name: word_conversion_rule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.word_conversion_rule ALTER COLUMN id SET DEFAULT nextval('public.word_conversion_rule_id_seq'::regclass);

--
-- Name: event_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_type_id_seq', 28, true);


--
-- Name: event_type_mapping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_type_mapping_id_seq', 4, true);


--
-- Name: hub_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hub_id_seq', 1, false);


--
-- Name: pp_token_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pp_token_info_id_seq', 1, false);


--
-- Name: table_seq_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.table_seq_seq', 1, false);


--
-- Name: waybill_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.waybill_status_id_seq', 45, true);


--
-- Name: word_conversion_rule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.word_conversion_rule_id_seq', 1, false);


--
-- Name: event_type_mapping event_type_mapping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_type_mapping
    ADD CONSTRAINT event_type_mapping_pkey PRIMARY KEY (id);


--
-- Name: event_type event_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_type
    ADD CONSTRAINT event_type_pkey PRIMARY KEY (id);


--
-- Name: hub hub_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hub
    ADD CONSTRAINT hub_pkey PRIMARY KEY (id);


--
-- Name: pp_token_info pp_token_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pp_token_info
    ADD CONSTRAINT pp_token_info_pkey PRIMARY KEY (id);


--
-- Name: shipment shipment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipment
    ADD CONSTRAINT shipment_pkey PRIMARY KEY (shipment_no);


--
-- Name: waybill_status status_uq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waybill_status
    ADD CONSTRAINT status_uq UNIQUE (status);


--
-- Name: tracking_event tracking_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracking_event
    ADD CONSTRAINT tracking_event_pkey PRIMARY KEY (event_no);


--
-- Name: waybill waybill_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waybill
    ADD CONSTRAINT waybill_pkey PRIMARY KEY (waybill_no);


--
-- Name: waybill_status waybill_status_code_uq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waybill_status
    ADD CONSTRAINT waybill_status_code_uq UNIQUE (waybill_status_code);


--
-- Name: waybill_status waybill_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waybill_status
    ADD CONSTRAINT waybill_status_pkey PRIMARY KEY (id);


--
-- Name: word_conversion_rule word_conversion_rule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.word_conversion_rule
    ADD CONSTRAINT word_conversion_rule_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

